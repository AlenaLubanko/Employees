import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEmployeeThunk } from '../../redux/action-creater';
import EmployeeList from '../EmployeeList';

function MainPage() {
  const dispatch = useDispatch();
  console.log('mainpage');
// const [something, setSomeThing] = useState(false)

  useEffect(() => {
    console.log('useeffect main page');
    dispatch(getEmployeeThunk());
    // setSomeThing(true)
  }, [dispatch]);


  return (
    <>
    

    <EmployeeList />
    
    </>
  )
}
export default MainPage;