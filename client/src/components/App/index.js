import './App.css';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';
import MainPage from '../MainPage';
import FormAddEmployee from '../FormAddEmployee';
import FormUpdateEmployee from '../FormUpdateEmployee';
import Contacts from '../Contacts';
import Header from '../Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/employees/newemployee">
          <FormAddEmployee />
        </Route>
        <Route exact path="/employees/employee/:idEmployee">
          <FormUpdateEmployee />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
