const JobHandler = require("./job.handler");
const ApplicationHandler = require("../application/application.handler");

// Function to add a new job
const addJob = async (req, res) => {
  const user = req.user;

  if (user.type !== "recruiter") {
    return res.status(401).json({ message: "You don't have permissions to add jobs" });
  }

  const data = req.body;
  const job = {
    userId: user._id,
    profile: user.profile,
    title: data.title,
    maxApplicants: data.maxApplicants,
    maxPositions: data.maxPositions,
    dateOfPosting: data.dateOfPosting,
    deadline: data.deadline,
    skillsets: data.skillsets,
    jobType: data.jobType,
    duration: data.duration,
    salary: data.salary,
    rating: data.rating,
    description: data.description,
    location: data.location,
  };

  try {
    await JobHandler.addJobs(job);
    return res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding job", error: error.message });
  }
};


// Function to get list job
const getJobList = async (req, res) => {
  let user = req.user;
  // Define filters and sorting parameters based on query parameters
  let findParams = {};
  let sortParams = {};

  // Filter jobs based on title using 'q' query parameter
  if (req.query.q) {
    findParams = {
      ...findParams,
      title: {
        $regex: new RegExp(req.query.q, "i"),
      },
    };
  }

  // Filter jobs based on job type using 'jobType' query parameter
  if (req.query.jobType) {
    let jobTypes = [];
    if (Array.isArray(req.query.jobType)) {
      jobTypes = req.query.jobType;
    } else {
      jobTypes = [req.query.jobType];
    }
    console.log(jobTypes);
    findParams = {
      ...findParams,
      jobType: {
        $in: jobTypes,
      },
    };
  }

  // Filter jobs based on salary range using 'salaryMin' and 'salaryMax' query parameters
  if (req.query.salaryMin && req.query.salaryMax) {
    findParams = {
      ...findParams,
      $and: [
        {
          salary: {
            $gte: parseInt(req.query.salaryMin),
          },
        },
        {
          salary: {
            $lte: parseInt(req.query.salaryMax),
          },
        },
      ],
    };
  } else if (req.query.salaryMin) {
    findParams = {
      ...findParams,
      salary: {
        $gte: parseInt(req.query.salaryMin),
      },
    };
  } else if (req.query.salaryMax) {
    findParams = {
      ...findParams,
      salary: {
        $lte: parseInt(req.query.salaryMax),
      },
    };
  }

  // Filter jobs based on duration using 'duration' query parameter
  if (req.query.duration) {
    findParams = {
      ...findParams,
      duration: {
        $lt: parseInt(req.query.duration),
      },
    };
  }

  // Define sorting parameters based on 'asc' and 'desc' query parameters
  if (req.query.asc) {
    if (Array.isArray(req.query.asc)) {
      req.query.asc.map((key) => {
        sortParams = {
          ...sortParams,
          [key]: 1,
        };
      });
    } else {
      sortParams = {
        ...sortParams,
        [req.query.asc]: 1,
      };
    }
  }

  if (req.query.desc) {
    if (Array.isArray(req.query.desc)) {
      req.query.desc.map((key) => {
        sortParams = {
          ...sortParams,
          [key]: -1,
        };
      });
    } else {
      sortParams = {
        ...sortParams,
        [req.query.desc]: -1,
      };
    }
  }
  let arr = [
    {
      $lookup: {
        from: "recruiterinfos",
        localField: "userId",
        foreignField: "userId",
        as: "recruiter",
      },
    },
    { $unwind: "$recruiter" },
    { $match: findParams },
  ];

  // Add sorting stage to the pipeline if sorting parameters are present
  if (Object.keys(sortParams).length > 0) {
    arr = [
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "userId",
          foreignField: "userId",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      { $match: findParams },
      {
        $sort: sortParams,
      },
    ];
  }

  console.log(arr);

  // Execute the aggregation query
  const result = await JobHandler.getAggregateQuery(arr);
  res.json(result);
    
};
// Function to get a specific job by ID
const getJobId = async (req, res) => {
  try {
    const id = await JobHandler.convertObjectId(req.params.id)
    const job = await JobHandler.getJobsObjByQuery(id);
    if (!job) {
      return res.status(404).json({ message: "Job does not exist" });
    }

    return res.json(job);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching job", error: error.message });
  }
};

// Function to update job details
const updateJobDetails = async (req, res) => {
  const user = req.user;

  if (user.type !== "recruiter") {
    return res.status(401).json({ message: "You don't have permissions to update the job" });
  }

  try {
    const job = await JobHandler.getJobsObjByQuery({_id:req.params.id});
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const updatedJob = await JobHandler.updateJobs({_id:req.params.id, userId:user._id}, req.body);
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found or not authorized to update" });
    }

    return res.json({ message: "Job updated successfully", updatedJob });
  } catch (error) {
    return res.status(500).json({ message: "Error updating job", error: error.message });
  }
};

const applyJob = async (req, res) => {
  try {
    const user = req.user;

    // Check if the user is an applicant
    if (user.type !== "applicant") {
      return res.status(401).json({
        message: "You don't have permissions to apply for a job",
      });
    }

    // Check if the user has an active or accepted job application
    const acceptedJob = await ApplicationHandler.getApplicationObjByQuery({
      userId: user._id,
      status: { $nin: ["accepted", "finished"] },
    });
    console.log("nishant",acceptedJob);
    if (acceptedJob) {
      return res.status(400).json({
        message:
          "You already have an accepted job. Hence you cannot apply for a new one.",
      });
    }

    const data = req.body;
    const jobId = req.params.id;

    // Check if the user has already applied for the job
    const appliedApplication = await ApplicationHandler.getApplicationByQuery({
      userId: user._id,
      jobId: jobId,
      status: { $nin: ["deleted", "cancelled"] },
    });

    if (appliedApplication && appliedApplication.status === "applied") {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // Check if the job exists
    const job = await JobHandler.getJobsObjByQuery({ _id: jobId });

    if (!job) {
      return res.status(404).json({
        message: "Job does not exist",
      });
    }

    // Count the number of active applications for the job
    const activeApplicationCount = await ApplicationHandler.getAllDocumentsCount({
      jobId: jobId,
      status: { $nin: ["rejected", "deleted", "cancelled", "finished"] },
    });

    // Check if the max number of applicants for the job is reached
    if (activeApplicationCount >= job.maxApplicants) {
      return res.status(400).json({
        message: "Application limit reached",
      });
    }

    // Count the number of active applications for the applicant
    const myActiveApplicationCount = await ApplicationHandler.getAllDocumentsCount({
      userId: user._id,
      status: { $nin: ["rejected", "deleted", "cancelled", "finished"] },
    });

    if (myActiveApplicationCount >= 10) {
      return res.status(400).json({
        message: "You have 10 active applications. Hence you cannot apply.",
      });
    }

    // Check if the applicant has any accepted jobs
    const acceptedJobs = await ApplicationHandler.getAllDocumentsCount({
      userId: user._id,
      status: "accepted",
    });

    if (acceptedJobs > 0) {
      return res.status(400).json({
        message: "You already have an accepted job. Hence you cannot apply.",
      });
    }

    // Create a new application instance
    const application = {
      userId: user._id,
      recruiterId: job.userId,
      jobId: job._id,
      status: "applied",
      sop: data.sop,
    };

    // Save the application to the database
    await ApplicationHandler.addApplication(application);
    res.json({ message: "Job application successful" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const checkApply = async (req, res) => {
  const user = req.user;

  if (user.type !== "applicant") {
    res.status(400).json({
      message: "You don't have permissions to check for an accepted job",
    });
    return;
  }

  try {
    const acceptedJob = await ApplicationHandler.getApplicationObjByQuery({
      userId: user._id,
      status: "accepted",
    });

    if (!acceptedJob) {
      const finishedJob = await ApplicationHandler.getApplicationObjByQuery({
        userId: user._id,
        status: "finished",
      });

      if (finishedJob) {
        res.json({
          hasAcceptedJob: true,
        });
        return;
      }
    }

    res.json({
      hasAcceptedJob: acceptedJob !== null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// recruiter gets applications for a particular job
const getApplications = async (req, res) => {
  const user = req.user;

  // Check if the user is a recruiter
  if (user.type != "recruiter") {
    res.status(401).json({
      message: "You don't have permissions to view job applications",
    });
    return;
  }
  const jobId = req.params.id;

  // const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  // const skip = page - 1 >= 0 ? (page - 1) * limit : 0;

  // Define filtering parameters based on query parameters
  let findParams = {
    jobId: jobId,
    recruiterId: user._id,
  };

  let sortParams = {};

  // Filter applications based on status using 'status' query parameter
  if (req.query.status) {
    findParams = {
      ...findParams,
      status: req.query.status,
    };
  }

  // Retrieve applications from the database
  const result = await ApplicationHandler.getApplicationByQuery(findParams,0,10,{},sortParams,null,{locale: "en" })
  res.json(result);
};

// Function to delete a job
const deleteJob = async (req, res) => {
  const user = req.user;

  if (user.type !== "recruiter" && user.type !== "admin") {
    return res.status(401).json({ message: "You don't have permissions to delete the job" });
  }

  try {
    const deletedJob = await JobHandler.deleteJobs(req.params.id, user._id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ message: "Job deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};


module.exports = {
  addJob,
  getJobList,
  getJobId,
  updateJobDetails,
  applyJob,
  checkApply,
  getApplications,
  deleteJob,
};
