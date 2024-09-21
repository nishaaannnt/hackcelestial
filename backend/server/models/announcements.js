const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'UserAuth'
    },
    title: {
        type: String,
        validate: {
          validator: function (v) {
            return v.split(" ").filter((ele) => ele != "").length <= 30;
          },
          msg: "Title should not be greater than 30 words",
        },
        required:true
    },
    dateOfAnnouncement: {
      type: Date,
      default: Date.now,
    },
    post: {
      type: String,
      validate: {
        validator: function (v) {
          return v.split(" ").filter((ele) => ele != "").length <= 250;
        },
        msg: "Statement of purpose should not be greater than 250 words",
      },
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("announcements", schema);
