const authRouter = require("../auth/auth.route.js");
const userRouter = require("../user/user.route.js");
const jobRouter = require("../job/job.route.js");
const applicationRouter = require("../application/application.route.js");
const ratingRouter = require("../rating/rating.route.js");
const uploadRouter = require("./uploadImage.route.js");
const ResumeRouter = require("./uploadResume");
const downloadRouter = require("./download.route.js");
const applicantRouter = require("../applicant/applicant.route.js");

const initRouter = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/jobs", jobRouter);
  app.use("/api/applications", applicationRouter);
  app.use("/api/rating", ratingRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/uploadResume", ResumeRouter);
  app.use("/api/download", downloadRouter);
  app.use("/api/applicants", applicantRouter);
};

module.exports = initRouter;
