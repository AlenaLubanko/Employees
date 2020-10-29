import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './formAddEmployee.module.css';
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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const StyledTextField = withStyles({
  root: {
    width: '120%',
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
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function FormAddEmployee() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputText, setInputText] = useState('')
  const [inputs, setInputs] = useState({
    name: '',
    role: '',
    phone: '',
    birthday: '',
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
    const response = await fetch('/employees/newemployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    });
    if (response.status === 200) {
      dispatch({
        type: 'AUTHENTICATED_SUCCESSFULLY'
      });
      return history.push('/');
    }
    // return setError('Повторите вход')
  }

  const [values, setValues] = React.useState({
    phone: '(950)123-4567',
    
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.wrapper}>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        <Link to="/">Перейти на главную страницу</Link>
      </Button>
      <h3>Форма для добавления нового сотрудника в базу данных:</h3>
      <p>Все поля обязательны для заполнения!</p>
      <div className={styles.signUp}>
        <div className={styles.childDiv}>
          <form action='/users/signup' method="POST" id='regForm' className={classes.root} noValidate autoComplete="off">
            <StyledTextField required id="outlined-basic" placeholder='name' type='text' name='name' onChange={changeInputs} />
            <br />
            <StyledTextField required id="outlined-basic" placeholder='role' type='text' name='role' onChange={changeInputs} />
            <br />
            <Input
              value={values.textmask}
              onChange={handleChange}
              name="phone"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
            />
            {/* <StyledTextField required id="outlined-basic"  name='phone' onChange={changeInputs} /> */}
            <br />
            <StyledTextField required id="outlined-basic" placeholder='birthday' type='date' name='birthday' onChange={changeInputs} />
            
            <br />
          </form>
          <form className={classes.root} noValidate autoComplete="off">

          </form>
          <Button onClick={handleSubmit} variant="contained" type='submit'>Добавить сотрудника</Button>
        </div>
      </div >
    </div>
  )
}

export default FormAddEmployee;