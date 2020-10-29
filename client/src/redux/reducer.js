import { ADD_EMPLOYEE, GET_EMPLOYEE_DB, CHANGE_STATUS } from '../redux/action-types';

function reducer(state = [], action) {
  switch (action.type) {
    case GET_EMPLOYEE_DB:
      return [
        ...action.payload
      ]
    case CHANGE_STATUS:
      const newArray = [...state];
      const array1 = newArray.map((element) => {
        console.log(element);
        if (element._id === action.payload) {
          element.isArchive = !element.isArchive;
        }
        return element;
      });
      return array1;
    default:
      return state;
  }
}

export default reducer;