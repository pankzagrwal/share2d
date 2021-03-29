import React from "react";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PinDrop from '@material-ui/icons/PinDrop';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';



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
    const history = useHistory();

    const [geoPosition, setGeoPosition] = React.useState({});


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
    const handleUpdateOffer = () => {
         history.push("/addOffer");
    }
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
                 <Container maxWidth='xs' justify='center' className={classes.paper}>
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
                        <Button variant='outlined' color='primary' onClick={handleUpdateOffer} size='small'>
                            Update Offer
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                    </Grid>
                 </Grid>
            </form>
         </Container>

        </>
    )
}
