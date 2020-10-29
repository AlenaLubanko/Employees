import express from 'express';
import mongoose from 'mongoose';
import employeesRouter from './routes/employeeRouter.js';
// import TaskModel from './models/taskModel.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/employees', employeesRouter);

app.listen(3001);
