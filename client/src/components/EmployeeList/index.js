import React, { useState } from 'react';
import styles from './employeeList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployeeThunk, changeStatus, updateStatusThunk } from '../../redux/action-creater';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function EmployeeList() {
  console.log('component EmployeeList');
  const employeesArray = useSelector(state => state.employee);
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(employeesArray);
  // const [employeesList, setEmployeesList] = useState(employeesArray);
  const [ascName, setAscName] = useState(true)
  console.log(ascName);


  function onSort(event, sortKey, ascName) {
   console.log(ascName);
    const data = [...employeesArray];
    if (ascName) {
      data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    //  return setEmployeesList(data)
    } else {
      data.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
      // return setEmployeesList(data)
    }
    console.log(data);
  }

  function onSortByDate(event, sortKey) {
    const data = [...employeesArray];
    data.sort(function (a, b) {
      return new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
    });
    // setEmployeesList(data)
  }

  function updateStatus(id, status) {
    console.log(status);
    dispatch(updateStatusThunk(id, status));
  }

  return (
    <>
      <h1>Список сотрудников</h1>
      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell onClick={(event) => {onSort(event, 'name', ascName); setAscName(!ascName)}} name="name" style={{ width: '20%' }}>Имя и фамилия сотрудника</StyledTableCell>
                <StyledTableCell onClick={(event) => onSortByDate(event, 'birthday')} name="birthday" align="center" style={{ width: '20%' }}>Дата рождения</StyledTableCell>
                <StyledTableCell align="center" style={{ width: '20%' }}>Должность</StyledTableCell>
                <StyledTableCell align="center" style={{ width: '20%' }}>Номер телефона</StyledTableCell>
                <StyledTableCell align="center" style={{ width: '20%' }}>В архиве</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeesArray.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell scope="row" style={{ width: '20%' }}>
                    {row.name}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '20%' }}>{row.birthday}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '20%' }}>{row.role}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '20%' }}>{row.phone}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '20%' }}>
                    {row.isArchive
                      ? <input type="checkbox" checked onClick={() => updateStatus(row._id, row.isArchive)} />
                      : <input type="checkbox" onClick={() => updateStatus(row._id, row.isArchive)} />
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default EmployeeList;