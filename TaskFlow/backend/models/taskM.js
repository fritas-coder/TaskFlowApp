const mongoose = require("mongoose");

const taskShema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a text value"],
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskShema);
