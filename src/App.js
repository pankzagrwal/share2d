import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BottomNavigation from './components/bottomNavigation/bottomNavigation.js';
import Dashboard from './components/Dashboard/dashboard.js';
import Registration from './components/Registration/registration.js';
import AddOffer from './components/AddOffer/addOffer.js';
import Profile from './components/Profile/profile.js'
import ReferBuddy from './components/ReferBuddy/referBuddy.js';
import Login from './components/Login/login.js';
import AllCommmission from './components/AllCommission/allCommission.js'
import ConsolidatedCommission from './components/ConsolidatedCommission/consolidatedCommission.js';

const RouteWrapper = ({component: Component, ...rest}) => {
  const authToken = window.localStorage && localStorage.getItem('authToken')
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authToken ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default function Routes() {
  return (
    <Router>
      <>
        <Switch>
          <RouteWrapper component={Dashboard} path='/'  exact/>
          <RouteWrapper component={AddOffer} path='/addOffer'  exact/>
          <RouteWrapper component={Profile} path='/profile'  exact/>
          <RouteWrapper component={ReferBuddy} path='/referBuddy'  exact/>
          <RouteWrapper component={Dashboard} path='/'  exact/>
          <RouteWrapper component={AllCommmission} path='/allCommissions' exact />
          <RouteWrapper component={ConsolidatedCommission} path='/consolidatedCommission' exact />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Registration />
          </Route>
        </Switch>

        <BottomNavigation />
      </>
    </Router>
  );
}
