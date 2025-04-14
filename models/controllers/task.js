const Task = require("../models/Task");


exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      category,
      createdBy: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};