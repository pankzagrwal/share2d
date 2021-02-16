import React from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {
    Checkbox 
} from  '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logoImage from '../../assets/share2d.png'

const useStyles = makeStyles((theme) => ({
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
  logoContainer: {
    backgroundImage: `url(${logoImage})`,
    width: '100px',
    height: '100px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
}));

export default function Registration () {
     const classes = useStyles();
     const [mobileNumber, setMobileNumber] = React.useState('');
     const [password, setPassword] = React.useState('');
     const [isOTP, setisOTP] = React.useState(false)
     const [OTP, setOTP] = React.useState('')

    const handleSubmit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
    }
    return (
        <Container maxWidth='xs' justify='center' className={classes.paper}>
         <Grid container justify='center' alignItems='center'>
            <Grid item className={classes.logoContainer}>
            </Grid>
         </Grid>
         <Typography variant="h4" component="h2" gutterBottom>
            Login
        </Typography>
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
                            value={mobileNumber}
                            onChange={(evt) =>{setMobileNumber(evt.target.value)}}
                        />
                    </Grid>
                    {
                        !isOTP &&
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
                    }
                    {
                        isOTP &&
                        <Grid item xs={12}>
                            <TextField
                                name="otp"
                                variant="outlined"
                                type="number"
                                required
                                fullWidth
                                label="OTP"
                                value={OTP}
                                onChange={(evt) =>{setOTP(evt.target.value)}}
                            />
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Grid container alignItems='center' justify='flex-start'>
                            <Grid>
                                <Typography variant="caption">
                                    Login using OTP
                                </Typography>
                            </Grid>
                            <Grid>
                                <Checkbox
                                    checked={isOTP}
                                    onChange={() => {setisOTP(!isOTP)}}
                                    color="primary"
                                />
                            </Grid>
                            {
                                isOTP &&
                                <Grid>
                                    <Button size="small" variant="outlined" color="primary">Re-send OTP</Button>
                                </Grid>
                            }
                        </Grid>
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
    )
}
