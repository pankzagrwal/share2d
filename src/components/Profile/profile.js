import React from "react";
// import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
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
    Tab,
    MenuItem
} from '@material-ui/core';

import AddOffer from '../AddOffer/addOffer.js'

import {getIndustries, saveProfile} from './actions';

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
    const dispatch = useDispatch();
    const [geoPosition, setGeoPosition] = React.useState({});

    const searchParam = new URLSearchParams(window.location.search);
    const tab = parseInt(searchParam.get('tab') , 10) || 0;

    const [tabId, setTabId] = React.useState(tab);

    const industriesList = useSelector(state => state?.config?.industries ?? [])
    const user  = useSelector(state => state.user) || {};
    const {
        store: {
            id,
            store_name,
            phone,
            address,
            latitude,
            longitude,
            industry
        } = {}
    } = user;

    const [storeName, setStoreName] = React.useState(store_name);
    const [storeAddress, setStoreAddress] = React.useState(address)
    const [industryId, setIndustryId] = React.useState(industry)

    React.useEffect(() => {
        setStoreAddress(address);
        setStoreName(store_name);
        setIndustryId(industry);
        setGeoPosition({
            latitude,
            longitude
        })
    }, [store_name, address, industry, latitude, longitude])

    const  handleChange = (evt, value) => {
      setTabId(value)
    }


    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                setGeoPosition({
                    latitude,
                    longitude
                })
            })
            dispatch({
                type: 'SET_ALERT',
                payload: {
                    severity: 'success',
                    message: 'Location Updated. Please submit',
                    isOpen: true
                }
            })
        }

    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        dispatch(saveProfile({
            id,
            store_name: storeName,
            industry: industryId,
            address: storeAddress,
            latitude: Number.parseFloat(geoPosition?.latitude).toFixed(5),
            longitude: Number.parseFloat(geoPosition?.longitude).toFixed(5)
        }))
    }

    React.useEffect(() => {
        dispatch(getIndustries())
    }, [dispatch])

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
                         <form onSubmit={handleSubmit} autoComplete='off'>
                             <Grid container spacing={2} alignItems='center' justify='center'>
                                <Grid item xs={12}>
                                    <TextField
                                        name="mobileNumber"
                                        variant="outlined"
                                        type="number"
                                        required
                                        fullWidth
                                        label="Mobile Number"
                                        value={phone}
                                        disabled
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
                                        value={storeName}
                                         onChange={(evt) => {setStoreName(evt.target.value)}}
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
                                        value={storeAddress}
                                         onChange={(evt) => {setStoreAddress(evt.target.value)}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems='center' justify='space-between'>
                                        <Grid item>
                                            <Button variant="outlined" color="primary" endIcon={<PinDrop />} onClick={getGeoLocation} size='small'>
                                                Update Location
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button size='small' href={`https://www.google.com/maps/search/?api=1&query=${geoPosition?.latitude},${geoPosition?.longitude}`} color="secondary" target='_blank' endIcon={<NavigationIcon />}>
                                                My Location
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        id="industry"
                                        value={industryId}
                                        onChange={(evt) => { setIndustryId(evt.target.value)}}
                                        label="Select Industry"
                                        className={classes.textField}
                                        >
                                        {
                                            industriesList.map((item, i) => {
                                                return <MenuItem value={item.id} key={i}>{item.name}</MenuItem>
                                            })
                                        }
                                    </TextField>
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
