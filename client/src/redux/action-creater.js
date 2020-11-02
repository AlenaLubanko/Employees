import { ADD_EMPLOYEE, GET_EMPLOYEE_DB, CHANGE_STATUS } from './action-types';

export function addEmployeeThunk(event, inputText, setInputText) {
  return async function (dispatch) {
    //  console.log(inputText);
    event.preventDefault();
    const response = await fetch('/employees/newemployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputText }),
    });
    // const data = await response.json();
    // if (response.status === 200) {
    //   dispatch(updateArrayTasks(data));
    //   setInputText('');
    // }
    // console.log(data.errorMessage);
  };
}

export function getEmployee(employeeArray) {
  return {
    type: GET_EMPLOYEE_DB,
    payload: employeeArray,
  };
}

export function getEmployeeThunk() {
  console.log('getEmployeeThunk');
  return async function (dispatch) {
    try {
      const response = await fetch('/employees');
      const result = await response.json();
      console.log(result);
      result.employeesFromBD.map((element) => {
        let birthDate = new Date(element.birthday)
        element.birthday = ( '0' + birthDate.getDate()).slice(-2) + '.' + ('0' + (birthDate.getMonth() + 1)).slice(-2) + '.' + birthDate.getFullYear()
        return element
      })
      dispatch(getEmployee(result.employeesFromBD));
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeStatus(id) {
  return {
    type: CHANGE_STATUS,
    payload: id,
  };
}

export function updateStatusThunk(id, status) {
  return async function (dispatch) {
    const response = await fetch('/employees', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    dispatch(changeStatus(id));
  };
}

export function giveInfoForSortDateThunk(columnName, ascDate) {
  return async function (dispatch) {
    try {
      const response = await fetch('/employees/sortDate', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columnName, ascDate }),
      });
      const result = await response.json()
      result.employeesFromBD.map((element) => {
        let birthDate = new Date(element.birthday)
        element.birthday = ( '0' + birthDate.getDate()).slice(-2) + '.' + (birthDate.getMonth() + 1) + '.' + birthDate.getFullYear()
        return element
      })
      dispatch(getEmployee(result.employeesFromBD))
    } catch (error) {
      console.log(error);
    }
  };
}

export function giveInfoForFilterThunk(columnName, ascDate) {
  return async function (dispatch) {
    try {
      const response = await fetch('/employees/filter', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columnName, ascDate }),
      });
      const result = await response.json()
      result.employeesFromBD.map((element) => {
        let birthDate = new Date(element.birthday)
        element.birthday = ( '0' + birthDate.getDate()).slice(-2) + '.' + (birthDate.getMonth() + 1) + '.' + birthDate.getFullYear()
        return element
      })
      dispatch(getEmployee(result.employeesFromBD))
    } catch (error) {
      console.log(error);
    }
  };
}