const Task = require("../../db/models/task/index");

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result => {
    res.send({
      data: result
    });
  });
};

module.exports.createNewTask = (req, res, next) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send({
      data: result
    });
  });
};

module.exports.changeTask = (req, res, next) => {
  const {_id} = req.body;
  Task.updateOne({_id}, req.body).then(result => {
    Task.find().then(result => {
      res.send({
        data: result
      });
    });
  });
};

module.exports.deleteTask = (req, res, next) => {
  Task.deleteOne(req.query).then(result => {
    Task.find().then(result => {
      res.send({
        data: result
      });
    });
  });
};