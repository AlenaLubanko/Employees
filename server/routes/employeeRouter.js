import express from 'express';
import employeeModel from '../models/employeeModel.js';

const router = express.Router();

router.post('/newemployee', async (req, res) => {
  console.log('posttttt');
  console.log(req.body);
  const { name, role, phone, birthday } = req.body;

  let newEmployee;
  try {
    newEmployee = new employeeModel({
      name: name,
      role: role,
      phone: '+7 ' + phone,
      birthday: birthday,
      isArchive: false,
    });
    await newEmployee.save();
    // console.log(newEmployee);
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
    });
  }
  return res.status(200).json(newEmployee);
});

router.patch('/employee/:idEmployee', async (req, res) => {
  console.log('редактирование данных о сотруднике');
  // console.log(req.body);
  // console.log(req.params);
  const { name, role, phone } = req.body.inputs;
  const id = req.params.idEmployee;
  console.log(id, name, role, phone);
  let curEmpl = await employeeModel.findOneAndUpdate(id, {
    name: name,
    role: role,
    phone: phone,
    }, (error, result) => {
    if (error) {
      console.error(error);
    }
  });
  console.log(curEmpl);
  res.json({curEmpl});
});

router.get('/', async (req, res) => {
  // console.log('geeeet');
  let employeesFromBD;
  try {
    employeesFromBD = await employeeModel.find();
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
    });
  }
  res.status(200).json({ employeesFromBD });
});

router.patch('/', async (req, res) => {
  // console.log(req.body);
  const { id, status } = req.body;
  // console.log(id, status);
  await employeeModel.findOneAndUpdate(id, { isArchive: !status }, (error, result) => {
    if (error) {
      console.error(error);
    }
  });
  res.json(true);
});

router.patch('/sortDate', async (req, res) => {
  // console.log(req.body);
  const { columnName, ascDate } = req.body;
  let asc;
  if (ascDate) {
    asc = 1;
  }
  else {
    asc = -1;
  }
  let employeesFromBD = await employeeModel.find().sort([[columnName, asc]])
  // console.log(employeesFromBD);
  res.json({employeesFromBD});
});

router.patch('/filter', async (req, res) => {
  console.log(req.body);
  const { columnName, ascDate } = req.body;
  let employeesFromBD
  if (ascDate) {
    employeesFromBD = await employeeModel.find({isArchive: true})
  }
  else {
    employeesFromBD = await employeeModel.find({isArchive: false})
  }
 console.log(employeesFromBD);
  res.json({employeesFromBD});
});


export default router;
