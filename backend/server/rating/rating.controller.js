const RatingHandler = require("./rating.handler");
const ApplicationHandler = require("../application/application.handler");
const JobApplicantHandler = require("../applicant/applicant.handler");
const JobHandler = require("../job/job.handler");

const addRating = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const isRecruiter = user.type === "recruiter";  
    let rating = await RatingHandler.getRatingsByQuery({
      senderId: user._id,
      receiverId: isRecruiter ? data.applicantId : data.jobId,
      category: isRecruiter ? "applicant" : "job",
    });

    if (!rating) {
      const queryCriteria = isRecruiter
        ? { userId: data.applicantId, recruiterId: user._id }
        : { userId: user._id, jobId: data.jobId };

      const acceptedApplicant = await ApplicationHandler.getAllDocumentsCount({
        ...queryCriteria,
        status: { $in: ["accepted", "finished"] },
      });

      if (acceptedApplicant === 0) {
        return res.status(400).json({
          message: isRecruiter
            ? "Applicant didn't work under you. Hence you cannot give a rating."
            : "You haven't worked for this job. Hence you cannot give a rating.",
        });
      }

      // Create new rating
      const result = await RatingHandler.addRatings({
        category: isRecruiter ? "applicant" : "job",
        receiverId: isRecruiter ? data.applicantId : data.jobId,
        senderId: user._id,
        rating: data.rating,
      });
    } else {
      // Update existing rating
      await RatingHandler.updateRatings({_id: rating._id},{rating: data.rating});
    }

    // Calculate and update average rating
    const aggregatePipeline = [
      {
        $match: {
          receiverId: RatingHandler.convertObjectId(rating.receiverId),
          category: rating.category,
        },
      },
      { $group: { _id: null, average: { $avg: "$rating" } } },
    ];

    const result = await RatingHandler.getAggregateQuery(aggregatePipeline);
    let avg = result[0]?.average || 0;

    // Round the average rating to the nearest integer
    avg = Math.round(avg);

    if (isRecruiter) {
      await JobApplicantHandler.updateJobApplicant(
        { userId: rating.receiverId },
        { rating: avg }
      );
    } else {
      await JobHandler.updateJobs({ _id: rating.receiverId }, { rating: avg });
    }

    res.json({ message: "Rating added successfully" });
  } catch (e) {
    next(e);
  }
};

const getPersonalRating = async (req, res, next) => {
  try {
    const user = req.user;
    const rating = await RatingHandler.getRatingsObjByQuery({
      senderId: user._id,
      receiverId: req.query.id,
      category: user.type === "recruiter" ? "applicant" : "job",
    });

    if (!rating) {
      return res.json({ rating: -1 });
    }

    res.json({ rating: rating.rating });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addRating,
  getPersonalRating,
};
