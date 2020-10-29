import express from 'express';
import employeeModel from '../models/employeeModel.js';

const router = express.Router();

router.post('/newemployee', async (req, res) => {
  console.log(req.body);
  const { name, role, phone, birthday } = req.body;

  let newEmployee;
  try {
    newEmployee = new employeeModel({
      name: name,
      role: role,
      phone: phone,
      birthday: birthday,
      isArchive: false,
    });
    await newEmployee.save();
    console.log(newEmployee);
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
    });
  }
  return res.status(200).json(newEmployee);
});


router.get('/', async (req, res) => {
  console.log('geeeet');
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
  console.log(req.body);
  const { id, status } = req.body;
  console.log(id, status);
  await employeeModel.findOneAndUpdate(id, { isArchive: !status }, (error, result) => {
    if (error) {
      console.error(error);
    }
  });
  res.json(true);
});

export default router;
