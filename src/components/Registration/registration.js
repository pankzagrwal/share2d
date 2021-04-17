import React from "react";
import { useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import {postRegistration} from './actions.js';

import background from '../../assets/background.jpg'
import logo from '../../assets/logo.png'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(8)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  backgroundContainer: {
  },
  background: {
    width: '100%',
    backgroundImage: `url(${background})`,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'white',
  },
  logo: {
    backgroundImage: `url(${logo})`,
    padding: theme.spacing(5),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
}));

export default function Registration () {
     const classes = useStyles();
     const dispatch = useDispatch();
     const history = useHistory();
     const [shopName, setShopName] = React.useState('');
     const [shopAddress, setShopAddress] = React.useState('');
     const [mobileNumber, setMobileNumber] = React.useState('');
     const [password, setPassword] = React.useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        dispatch(postRegistration({
            shopName,
            shopAddress,
            mobileNumber,
            password
        })).then(res => {
             history.push("/profile?tab=1");
        })
    }
    return (
        <>
        <Grid container justify='center' alignItems='center' className={classes.backgroundContainer}>
            <Grid item container className={classes.background}>
                <Grid item container>
                    <Grid item className={classes.logo}>

                    </Grid>
                    <Grid item>
                        <Typography  variant="h6" gutterBottom>
                            Welcome to Share2d
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            The platform which helps you to increase your business
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
         </Grid>
        <Container maxWidth='xs' justify='center' className={classes.paper}>
         <Grid container justify='center' alignItems='center'>
            <Grid item className={classes.logoContainer}>
            </Grid>
         </Grid>
         <Typography variant="h6"  gutterBottom>
            Registration
        </Typography>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <Grid container spacing={2} alignItems='center' justify='center'>
                    <Grid item xs={12}>
                        <TextField
                            name="shopName"
                            variant="outlined"
                            fullWidth
                            label="Shop Name"
                            value={shopName}
                            onChange={(evt) =>{setShopName(evt.target.value)}}
                            autofocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="shopAddress"
                            variant="outlined"
                            multiline
                            fullWidth
                            label="Shop Address"
                            value={shopAddress}
                            onChange={(evt) =>{setShopAddress(evt.target.value)}}
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
                            value={mobileNumber}
                            onChange={(evt) =>{setMobileNumber(evt.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="password"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                            label="Password"
                            value={password}
                            onChange={(evt) =>{setPassword(evt.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Container>
        </>
    )
}
