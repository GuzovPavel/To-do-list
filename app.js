const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

const {
  Schema
} = mongoose;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
})

const Task = mongoose.model('tasks', taskScheme);


app.use(cors());

const url = "mongodb+srv://Ineie:nwlTCW8r@cluster0.imeaj.mongodb.net/for_To_Do?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send({
      data: result
    });
  })
})

app.post('/createTask', (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send({
      data: result
    });
  })

})

app.patch('/updateTask', (req, res) => {
  const {_id} = req.body;
  Task.updateOne({_id}, req.body).then(result => {
    Task.find().then(result => {
      res.send({
        data: result
      })
    })
  })
})


app.delete('/deleteTask', (req, res) => {
  Task.deleteOne(req.query).then(result => {
    Task.find().then(result => {
      res.send({
        data: result
      })
    })
  })
})

app.listen(8000, () => {
  console.log('example app listening on port 8000!')
});