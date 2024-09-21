const UserHandler = require("./user.handler");
const RecruiterHandler = require("../recruiter/recruiter.handler");
const JobApplicantHandler = require("../applicant/applicant.handler");
const ApplicationHandler = require("../application/application.handler");

async function getAllUser(req, res, next) {
  try {
    const allUser = await UserHandler.getUserByQuery();
    res.status(200).json({ allUser, message: "show all user successfully" });
  } catch (error) {
    next(e);
  }
}

async function getUser(req, res, next) {
  try {
    const user = req.user;
    if (user.type === "recruiter") {
      const recruiter = await RecruiterHandler.getRecruiterByQuery({
        userId: user._id,
      });
      if (!recruiter) {
        return res.status(404).json({ message: "User does not exist" });
      }
      res.json(recruiter);
    } else {
      const jobApplicant = await JobApplicantHandler.getApplicantByQuery({
        userId: user._id,
      });
      if (!jobApplicant) {
        return res.status(404).json({ message: "User does not exist" });
      }
      res.json(jobApplicant);
    }
  } catch (e) {
    next(e);
  }
}

// get user details from id
async function getUserId(req, res, next) {
  try {
    const userData = await UserHandler.getUserObjByQuery({
      _id: req.params.id,
    });
    if (userData.type === "recruiter") {
      const recruiter = await RecruiterHandler.getRecruiterObjByQuery({
        userId: userData._id,
      });
      if (!recruiter) {
        return res
          .status(404)
          .json({ message: "User recruiter does not exist" });
      }
      res.json(recruiter);
    } else if (userData.type === "applicant") {
      const jobApplicant = await JobApplicantHandler.getApplicantObjByQuery({
        userId: userData._id,
      });
      if (!jobApplicant) {
        return res
          .status(404)
          .json({ message: "User job applicant does not exist" });
      }
      res.json(jobApplicant);
    } else {
      res.json({ message: "Admin" });
    }
  } catch (e) {
    next(e);
  }
}

// update user details
async function updateUser(req, res, next) {
  try {
    const user = req.user;
    const data = req.body;
    if (user.type == "recruiter") {
      const recruiter = await RecruiterHandler.getRecruiterObjByQuery({
        userId: user._id,
      });
      if (!recruiter) {
        return res.status(404).json({ message: "User does not exist" });
      }

      recruiter.contactNumber = data.contactNumber || recruiter.contactNumber;
      recruiter.profile = data.profile || recruiter.profile;
      recruiter.bio = data.bio || recruiter.bio;
      recruiter.banner = data.banner || recruiter.banner;

      await recruiter.save();
    } else {
      const jobApplicant = await JobApplicantHandler.getApplicantObjByQuery({
        userId: user._id,
      });
      if (!jobApplicant) {
        return res.status(404).json({ message: "User does not exist" });
      }
      jobApplicant.name = data.name || jobApplicant.name;
      jobApplicant.education = Array.isArray(data.education)
        ? data.education
        : jobApplicant.education;
      jobApplicant.skills = data.skills || jobApplicant.skills;
      jobApplicant.resume = data.resume || jobApplicant.resume;
      jobApplicant.profile = data.profile || jobApplicant.profile;
      jobApplicant.dateOfBirth = data.dateOfBirth || jobApplicant.dateOfBirth;

      await JobApplicantHandler.updateJobApplicant({
        userId: user._id,
      },jobApplicant);
    }

    res.json({ message: "User information updated successfully" });
  } catch (e) {
    next(e);
  }
}

// get all job applicants
async function getAllUserApplicant(req, res, next) {
  try {
    const allUser = await JobApplicantHandler.getApplicantByQuery();
    res
      .status(200)
      .json({ allUser, message: "All users retrieved successfully" });
  } catch (e) {
    next(e);
  }
}

// get applicant by id
async function getIdApplicant(req, res, next) {
  try {
    const jobApplicant = await JobApplicantHandler.getApplicantObjByQuery({
      _id: req.params._id,
    });
    if (!jobApplicant) {
      return res.status(404).json({ message: "User applicant does not exist" });
    }
    res.json(jobApplicant);
  } catch (e) {
    next(e);
  }
}

// get all recruiters
async function getAllUserRecruiter(req, res, next) {
  try {
    const allUser = await RecruiterHandler.getRecruiterByQuery();
    res
      .status(200)
      .json({ allUser, message: "All users retrieved successfully" });
  } catch (e) {
    next(e);
  }
}

// get recruiter by id
async function getIdRecruiter(req, res, next) {
  try {
    const recruiter = await RecruiterHandler.getRecruiterObjByQuery({
      userId: req.params.userId,
    });
    if (!recruiter) {
      return res.status(404).json({ message: "User recruiter does not exist" });
    }
    res.json(recruiter);
  } catch (e) {
    next(e);
  }
}

async function getAList(req, res, next) {
  try {
    const user = req.user;
    if (user.type !== "recruiter") {
      return res.status(400).json({
        message: "You are not allowed to access applicants list",
      });
    }

    let findParams = {
      recruiterId: user._id,
    };
    if (req.query.jobId) {
      findParams = {
        ...findParams,
        jobId: await JobApplicantHandler.convertObjectId(req.query.jobId),
      };
    }
    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        findParams = {
          ...findParams,
          status: { $in: req.query.status },
        };
      } else {
        findParams = {
          ...findParams,
          status: req.query.status,
        };
      }
    }
    let sortParams = {};

    if (!req.query.asc && !req.query.desc) {
      sortParams = { _id: 1 };
    }

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
    const aggregrateQuery = [
      {
        $lookup: {
          from: "jobapplicantinfos",
          localField: "userId",
          foreignField: "userId",
          as: "jobApplicant",
        },
      },
      { $unwind: "$jobApplicant" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      { $match: findParams },
      { $sort: sortParams },
    ];
    const applications = await ApplicationHandler.getAggregateQuery(aggregrateQuery);
    console.log(applications,"nishant")
    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applicants found",
      });
    }
    res.json(applications);
  } catch (e) {
    next(e);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = req.user;
    if (user.type !== "admin") {
      return res.status(401).json({
        message: "You don't have permissions to delete users",
      });
    }

    const deletedUser = await UserHandler.deleteUser({ _id: req.params.id });
    console.log("Deleted user from UserAuth:", deletedUser);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const deletedJobApplicant = await JobApplicantHandler.deleteJobApplicant({
      userId: deletedUser._id,
    });
    console.log("Deleted job applicant:", deletedJobApplicant);

    res.json({
      message: "User deleted successfully",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getUser: getUser,
  getAList: getAList,
  getAllUser: getAllUser,
  getUserId: getUserId,
  getIdRecruiter: getIdRecruiter,
  getIdApplicant: getIdApplicant,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getAllUserApplicant: getAllUserApplicant,
  getAllUserRecruiter: getAllUserRecruiter,
};
