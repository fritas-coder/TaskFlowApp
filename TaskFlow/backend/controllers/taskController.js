const Task = require("../models/taskM");
//create new task
const createTask = async (req, res) => {
  const { title, description, image, completed } = req.body;
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
    completed: completed,
  });
  //send back the created task
  res.status(201).json(task);
};

//get tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

//delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    //checking if task existe
    if (!task) {
      res.status(404).json({ message: "Task Not Found" });
    }
    if (task.user.toString() !== req.user.id) {
      res.status(401).json({ message: "Not Authorized" });
    }
    await task.deleteOne();
    res.status(200).json({ id: req.params.id, message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed To Delete Task" });
  }
};
module.exports = { createTask, getTasks, deleteTask };
