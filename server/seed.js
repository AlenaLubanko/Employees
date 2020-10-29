import mongoose from 'mongoose';
import employeeModel from './models/employeeModel.js';

mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

async function createEmployees() {
  const emp1 = await new employeeModel(
    {
      "name": "Илья Емельянов",
      "isArchive": false,
      "role": "driver",
      "phone": "+7 (883) 508-3269",
      "birthday": "12.02.1982"
    })
    const emp2 = await new employeeModel(
    {
      "name": "Александр Ларионов",
      "isArchive": true,
      "role": "waiter",
      "phone": "+7 (823) 440-3602",
      "birthday": "26.01.1986"
    })
    const emp3 = await new employeeModel(
    {
      "name": "Богдан Давыдов",
      "isArchive": false,
      "role": "driver",
      "phone": "+7 (971) 575-2645",
      "birthday": "29.11.1990"
    })
    const emp4 = await new employeeModel(
    {
      "name": "Олимпиада Макарова",
      "isArchive": true,
      "role": "waiter",
      "phone": "+7 (945) 447-2286",
      "birthday": "06.01.1987"
    })
    const emp5 = await new employeeModel(
    {
      "name": "Алла Котова",
      "isArchive": false,
      "role": "cook",
      "phone": "+7 (948) 523-2964",
      "birthday": "26.01.1982"
    })
    const emp6 = await new employeeModel(
    {
      "name": "Кира Колесникова",
      "isArchive": true,
      "role": "cook",
      "phone": "+7 (929) 592-3637",
      "birthday": "25.02.1972"
    })
    const emp7 = await new employeeModel(
    {
      "name": "Александр Третьяков",
      "isArchive": false,
      "role": "driver",
      "phone": "+7 (872) 568-2916",
      "birthday": "31.05.1979"
    })
    const emp8 = await new employeeModel(
    {
      "name": "Пелагея Морозова",
      "isArchive": false,
      "role": "driver",
      "phone": "+7 (977) 521-3479",
      "birthday": "11.09.1981"
    })
    const emp9 = await new employeeModel(
    {
      "name": "Агафон Громов",
      "isArchive": true,
      "role": "driver",
      "phone": "+7 (868) 569-3159",
      "birthday": "07.06.1988"
    })
    const emp10 = await new employeeModel(
    {
      "id": 10,
      "name": "Владлен Тетерин",
      "isArchive": true,
      "role": "driver",
      "phone": "+7 (808) 592-2480",
      "birthday": "20.06.1978"
    })
    const emp11 = await new employeeModel(
    {
      "name": "Валерий Пестов",
      "isArchive": false,
      "role": "cook",
      "phone": "+7 (899) 403-2387",
      "birthday": "20.01.1987"
    })
    const emp12 = await new employeeModel(
    {
      "name": "Даниил Кузнецов",
      "isArchive": true,
      "role": "waiter",
      "phone": "+7 (933) 582-2673",
      "birthday": "25.05.1987"
    })
    const emp13 = await new employeeModel(
    {
      "name": "Фёдор Веселов",
      "isArchive": true,
      "role": "waiter",
      "phone": "+7 (951) 517-3787",
      "birthday": "16.12.1972"
    })
    const emp14 = await new employeeModel(
    {
      "name": "Пантелеймон Ефимов",
      "isArchive": true,
      "role": "cook",
      "phone": "+7 (807) 492-3627",
      "birthday": "17.04.1986"
    })
    const emp15 = await new employeeModel(
    {
      "name": "Иванна Калашникова",
      "isArchive": true,
      "role": "waiter",
      "phone": "+7 (927) 488-2568",
      "birthday": "24.03.1982"
    })
    const emp16 = await new employeeModel(
    {
      "name": "Прасковья Кондратьева",
      "isArchive": true,
      "role": "cook",
      "phone": "+7 (875) 517-3873",
      "birthday": "07.06.1983"
    })
    const emp17 = await new employeeModel(
    {
      "name": "Евдокия Филиппова",
      "isArchive": false,
      "role": "waiter",
      "phone": "+7 (877) 450-3253",
      "birthday": "03.12.1994"
    })


  await emp1.save();
  await emp2.save();
  await emp3.save();
  await emp4.save();
  await emp5.save();
  await emp6.save();
  await emp7.save();
  await emp8.save();
  await emp9.save();
  await emp10.save();
  await emp11.save();
  await emp12.save();
  await emp13.save();
  await emp14.save();
  await emp15.save();
  await emp16.save();
  await emp17.save();
 
}

createEmployees();