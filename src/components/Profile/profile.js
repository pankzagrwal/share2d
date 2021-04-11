import React from "react";
// import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import PinDrop from '@material-ui/icons/PinDrop';
import NavigationIcon from '@material-ui/icons/Navigation';
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography,
    Tabs,
    Tab
} from '@material-ui/core';

import AddOffer from '../AddOffer/addOffer.js'


const useStyles = makeStyles((theme) => ({
backgroundContainer: {
      backgroundColor: '#f64e60',
      height: '50px',
      marginBottom: '25px',
      color: 'white',
  },
  name: {
      padding: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  textField: {
      width: '100%',
      marginTop:  theme.spacing(2),
      marginBottom:  theme.spacing(2)
  }
}));

export default function Profile () {
    const classes = useStyles();
    // const history = useHistory();

    const [geoPosition, setGeoPosition] = React.useState({});

    const [tabId, setTabId] = React.useState(0);

    const  handleChange = (evt, value) => {
      setTabId(value)
    }


    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(geoPosition)
                setGeoPosition({
                    latitude,
                    longitude
                })
            })
        }

    }
    // const handleUpdateOffer = () => {
    //      history.push("/addOffer");
    // }
    return (
        <>
            <Grid container className={classes.backgroundContainer}>
            <Grid item xs={12}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography variant="h6" className={classes.name}>
                           My Profile
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Container maxWidth='xs' justify='center' className={classes.paper} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Tabs value={tabId} onChange={handleChange}>
                        <Tab label="Personal Details"  id = {0} />
                        <Tab label="Offers" id = {1} />
                    </Tabs>
                </Grid>
                {
                    tabId === 0 &&
                    <Grid item xs={12}>
                         <form onSubmit={()=>{}} autoComplete='off'>
                             <Grid container spacing={2} alignItems='center' justify='center'>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        type="text"
                                        required
                                        fullWidth
                                        label="Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="mobileNumber"
                                        variant="outlined"
                                        type="number"
                                        required
                                        fullWidth
                                        label="Mobile Number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="shopName"
                                        variant="outlined"
                                        type="text"
                                        required
                                        fullWidth
                                        label="Shop Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="address"
                                        variant="outlined"
                                        type="text"
                                        multiline
                                        required
                                        fullWidth
                                        label="Address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems='center' justify='space-between'>
                                        <Grid item>
                                            <Button variant="outlined" color="primary" endIcon={<PinDrop />} onClick={getGeoLocation} size='small'>
                                                Refresh Location
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button size='small' href={`https://www.google.com/maps/search/?api=1&query=28.5078595,77.0683169`} color="secondary" target='_blank' endIcon={<NavigationIcon />}>
                                                My Location
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                             </Grid>
                         </form>
                    </Grid>
                    }
                    {
                        tabId === 1 &&
                        <AddOffer />
                    }
            </Grid>
         </Container>

        </>
    )
}
