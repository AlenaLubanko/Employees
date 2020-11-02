import React, { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './formUpdateEmployee.module.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import { updateStatusThunk } from '../../redux/action-creater';


const StyledTextField = withStyles({
  root: {
    width: '30%',
  },
})(TextField);



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


function FormUpdateEmployee() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { idEmployee } = useParams();
  // console.log(idEmployee);
  let employeesArray = useSelector((state) => state.employee)

  let currentEmployee = employeesArray.find(function (element) {
    if (element._id === idEmployee) {
      return element
    }
  })

  let [statusisArchive, setStatusIsArchive] = useState(currentEmployee.IsArchive);
  // console.log(statusisArchive);

  const [values, setValues] = React.useState({
    phone: currentEmployee.phone,
  });

  const [inputs, setInputs] = useState({
    name: currentEmployee.name,
    role: currentEmployee.role,
    phone: currentEmployee.phone,
    // birthday: currentEmployee.birthday,
    isArchive: currentEmployee.isArchive
  });

  function changeInputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
    console.log(inputs);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('patch fetchhhhhhhhh');
    const response = await fetch(`/employees/employee/${idEmployee}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs })
    })
    if (response.status === 200) {
      return history.push('/');
    }
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function updateStatus(id, status) {
    dispatch(updateStatusThunk(id, status));
  }


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapperTitle}>
          <h1>Редактирование информации о сотруднике</h1>
        </div>
        <p>Все поля обязательны для заполнения!</p>
        <div className={styles.signUp}>
          <div className={styles.childDiv}>
            <>
              {/* <form action='/users/signup' method="POST" id='regForm' className={classes.root} noValidate autoComplete="off"> */}
              <table>
                <tr>
                  <td>
                    <label>Фамилия и имя сотрудника</label>
                  </td>
                  <td>
                    <input onChange={changeInputs} placeholder={currentEmployee.name} className={styles.inputUpdate} type="text" name="name" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Должность {currentEmployee.role}</label>
                  </td>
                  <td>
                    {/* <input onChange={changeInputs} placeholder={inputs.role} className={styles.inputUpdate} type="text" /> */}
                    <select name="role" onChange={(e) => changeInputs(e)}>
                      <option>Выберите должность</option>
                      <option name="role" value="cook">cook</option>
                      <option name="role" value="driver">driver</option>
                      <option name="role" value="waiter">waiter</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Номер телефона</label>
                  </td>
                  <td>
                    <input name="phone" onChange={changeInputs} placeholder={currentEmployee.phone} className={styles.inputUpdate} type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>В архиве</label>
                  </td>
                  <td>
                    {currentEmployee.isArchive
                      ? <input type="checkbox" defaultChecked onClick={() => updateStatus(currentEmployee._id, currentEmployee.isArchive)} />
                      : <input type="checkbox" onClick={() => updateStatus(currentEmployee._id, currentEmployee.isArchive)} />
                    }
                  </td>
                </tr>
              </table>
            </>
          </div>
        </div>
        <div>
          <>

          </>
          {/* <div className={styles.dateDiv}>
            <label>Дата рождения </label>
            <span>{currentEmployee.birthday}</span>
            <StyledTextField value={inputs.birthday} required id="outlined-basic" placeholder={inputs.birthday} type='date' name='birthday' onChange={changeInputs} />

          </div> */}
        </div>
        <Button onClick={handleSubmit} variant="contained" type="submit" style={{ marginLeft: "70px" }}>Сохранить изменения</Button>
      </div>
    </>
  )
}

export default FormUpdateEmployee;