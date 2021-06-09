import React from "react";
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import {
  Link,
  useLocation
} from "react-router-dom";

const path = [
    '/',
    '/profile',
    '/ReferBuddy',
    '/consolidatedCommission'
]

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
});

export default function Navigation () {
    const classes = useStyles();
    const { pathname } = useLocation();
    const [value, setValue] = React.useState(0);
    const isLoggedIn = useSelector(state =>  state?.user?.id ?? false)
    React.useEffect(() => {
        setValue(path.indexOf(pathname))
    }, [pathname])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if (!isLoggedIn) {
      return null;
    }

    return (
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Home" value={0} icon={<Home />} component={Link} to={path[0]}/>
                <BottomNavigationAction label="Profile" value={1} icon={<AccountCircle />} component={Link} to={path[1]}/>
                <BottomNavigationAction label="Buddies" value={2} icon={<Group />}  component={Link} to={path[2]}/>
                <BottomNavigationAction label="Commission" value={3} icon={<MonetizationOn />}  component={Link} to={path[3]}/>
            </BottomNavigation>
    )
}
