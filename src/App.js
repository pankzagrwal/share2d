import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BottomNavigation from "./components/bottomNavigation/bottomNavigation.js";
import SnackBar from "./components/Snackbar/snackbar.js";
import Dashboard from "./components/Dashboard/dashboard.js";
import Registration from "./components/Registration/registration.js";
import AddOffer from "./components/AddOffer/addOffer.js";
import Profile from "./components/Profile/profile.js";
import ReferBuddy from "./components/ReferBuddy/referBuddy.js";
import Login from "./components/Login/login.js";
import AllCommmission from "./components/AllCommission/allCommission.js";
import ConsolidatedCommission from "./components/ConsolidatedCommission/consolidatedCommission.js";
import SettledCommission from "./components/SettledCommission/settledCommission.js";

import { getProfile } from "./actions.js";
const RouteWrapper = ({ component: Component, ...rest }) => {
  const authToken = window.localStorage && localStorage.getItem("authToken");
  const storeId = useSelector((state) => state?.user?.id);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        authToken && storeId ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 10000,
    color: "#fff",
  },
  loading: {
    zIndex: 10000,
    backgroundColor: "#f64e60",
    color: "white",
  },
}));

export default function Routes() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoader = useSelector((state) => state?.config?.loader ?? false);
  const isLoaded = useSelector((state) => state?.user?.isLoaded);

  React.useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  if (!isLoaded) {
    return (
      <Backdrop open={true} className={classes.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <Router>
      <>
        <Switch>
          <RouteWrapper component={Dashboard} path="/" exact />
          <RouteWrapper component={AddOffer} path="/addOffer" exact />
          <RouteWrapper component={Profile} path="/profile" exact />
          <RouteWrapper component={ReferBuddy} path="/referBuddy" exact />
          <RouteWrapper component={Dashboard} path="/" exact />
          <RouteWrapper
            component={AllCommmission}
            path="/allCommissions"
            exact
          />
          <RouteWrapper
            component={ConsolidatedCommission}
            path="/consolidatedCommission"
            exact
          />
          <RouteWrapper
            component={SettledCommission}
            path="/allSettled"
            exact
          />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Registration />
          </Route>
        </Switch>
        <SnackBar />
        <BottomNavigation />
        <Backdrop open={isLoader} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    </Router>
  );
}
