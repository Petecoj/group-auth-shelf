import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import AddItemPage from './components/AddItemPage/AddItemPage';
import ShelfPage from './components/ShelfPage/ShelfPage';
import UserPage from './components/UserPage/UserPage';
import ShelfTwoPage from './components/ShelfTwoPage/ShelfTwoPage';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/add"
          component={AddItemPage}
        />
        <Route
          path="/shelf"
          component={ShelfPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/shelfTwo"
          component={ShelfTwoPage}
        />
      </Switch>
    </Router>
  </div>
);

export default App;
