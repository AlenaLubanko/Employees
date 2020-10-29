import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
  name: String,
  isArchive: Boolean,
  role: String,
  phone: String,
  birthday: String,
})

 export default mongoose.model('employees', employeeSchema);