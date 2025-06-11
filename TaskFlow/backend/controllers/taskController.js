const Task = require("../models/taskM");
//create new task
const createTask = async (req, res) => {
  const { title, description, image } = req.body;
  //1- validate title
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }
  //create task
  const task = await Task.create({
    user: req.user.id,
    title,
    description,
    image,
  });
  //send back the created task
  res.status(201).json(task);
};
module.exports = { createTask };
