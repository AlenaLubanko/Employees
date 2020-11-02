import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './employeeList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployeeThunk, changeStatus, giveInfoForSortDateThunk, updateStatusThunk, giveInfoForFilterThunk } from '../../redux/action-creater';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.active,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.common.white,
  },
}))(StyledTableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

function EmployeeList() {
  // console.log('component EmployeeList');
  const employeesArray = useSelector(state => state.employee);
  const dispatch = useDispatch();
  const classes = useStyles();
  // console.log(employeesArray);
  // const [employeesList, setEmployeesList] = useState(employeesArray);
  // const [ascName, setAscName] = useState(true)
  const [ascDate, setAscDate] = useState(true)
  // console.log(ascName);


  // function onSort(event, sortKey, ascName) {
  //  console.log(ascName);
  //   const data = [...employeesArray];
  //   if (ascName) {
  //     data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
  //   //  return setEmployeesList(data)
  //   } else {
  //     data.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
  //     // return setEmployeesList(data)
  //   }
  //   console.log(data);
  // }

  function onSort(columnName) {
    setAscDate(!ascDate);
    dispatch(giveInfoForSortDateThunk(columnName, ascDate))
  }

  function onFilter(columnName) {
    setAscDate(!ascDate);
    dispatch(giveInfoForFilterThunk(columnName, ascDate))
  }

  function updateStatus(id, status) {
    dispatch(updateStatusThunk(id, status));
  }

  return (
    <div className={styles.wrapper}>
      <h1>Список сотрудников</h1>
      <h3 className={styles.note}>Для редактирования данных о сотруднике - нажмите на поле с фамилией</h3>
      <h3 className={styles.note2}>Для сортировки данных по имени / дате рождения сотрудника - нажмите на название соответствующего столбца</h3>
      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell onClick={(event) => onSort('name')} name="name" style={{ width: '20%' }}><div className={styles.divTitle}><div className={styles.child}>Имя и фамилия сотрудника</div><div className={styles.childImg}><img src="./more.png" alt="more" /></div></div></StyledTableCell>
                <StyledTableCell onClick={() => onSort('birthday')} name="birthday" style={{ width: '20%' }}><div className={styles.divTitle}><div className={styles.childDate}>Дата рождения</div><div className={styles.childImg}><img src="./more.png" alt="more" /></div></div></StyledTableCell>
                <StyledTableCell align="center" style={{ width: '20%' }}>Должность</StyledTableCell>
                <StyledTableCell align="center" style={{ width: '20%' }}>Номер телефона</StyledTableCell>


                <StyledTableCell className={styles.filter} onClick={() => onFilter('isArchive')}align="center" style={{ width: '20%' }}><div className={styles.divTitle}><div className={styles.child}>Статус(работает/в архиве)</div><div className={styles.childImg}><img src="./triangle.png" alt="triangle" /></div></div></StyledTableCell>



              </TableRow>
            </TableHead>
            <TableBody>
              {employeesArray.map((row) => (
                <StyledTableRow key={row._id}>
                
                <StyledTableCell scope="row" style={{ width: '20%' }}>
                <Tooltip title="Нажмите для редактирования" aria-label="add" placement="right">
                <Link to={`/employees/employee/${row._id}`} className={styles.updateEmployee}>{row.name}</Link></Tooltip></StyledTableCell>
                
                  <StyledTableCell align="center" style={{ width: '20%' }}>{row.birthday}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '20%' }}>{row.role}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '20%' }}>{row.phone}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '20%' }}><label>В архиве </label>
                    {row.isArchive
                      ? <input type="checkbox" defaultChecked onClick={() => updateStatus(row._id, row.isArchive)} />
                      : <input type="checkbox" onClick={() => updateStatus(row._id, row.isArchive)} />
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default EmployeeList;