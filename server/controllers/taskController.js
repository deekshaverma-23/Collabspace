const { Task } = require("../models");

exports.getTasks = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const tasks = await Task.findAll({
      where: { workspaceId },
    });
    res.json(tasks);
  } catch (err) {
    console.error("DATABASE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, workspaceId } = req.body;
    const newTask = await Task.create({
      title,
      description,
      status,
      workspaceId,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};
