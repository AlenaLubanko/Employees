import './App.css';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';
import MainPage from '../MainPage';
import FormAddEmployee from '../FormAddEmployee';
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
        <Route exact path="/empoyees/newemployee">
          <FormAddEmployee />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
