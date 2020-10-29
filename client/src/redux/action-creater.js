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