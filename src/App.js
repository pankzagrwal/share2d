import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BottomNavigation from './components/bottomNavigation/bottomNavigation.js';
import Dashboard from './components/Dashboard/dashboard.js';
import Registration from './components/Registration/registration.js';
import AddOffer from './components/AddOffer/addOffer.js';
import Profile from './components/Profile/profile.js'
import ReferBuddy from './components/ReferBuddy/referBuddy.js';
import Login from './components/Login/login.js';

export default function BasicExample() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Registration />
          </Route>
          <Route exact path="/addOffer">
            <AddOffer />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/referBuddy">
            <ReferBuddy />
          </Route>
        </Switch>

        <BottomNavigation />
      </>
    </Router>
  );
}
