import React from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import ResetPassword from "./resetPassword.js";

import { postLogin } from "./actions.js";

import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  backgroundContainer: {},
  background: {
    width: "100%",
    background: "linear-gradient(to bottom right, #F64F60, #8950FC)",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white",
  },
  logo: {
    backgroundImage: `url(${logo})`,
    padding: theme.spacing(5),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isResetpassword, setIsResetPassword] = React.useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(
      postLogin({
        mobileNumber,
        password,
      })
    ).then((res) => {
      history.push("/");
    });
  };
  const handleRegister = () => {
    history.push("/register");
  };
  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.backgroundContainer}
      >
        <Grid item container className={classes.background}>
          <Grid item container>
            <Grid item className={classes.logo}></Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Welcome to Share2d
              </Typography>
              <Typography variant="caption" gutterBottom>
                The platform which helps you to increase your business
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Container maxWidth="xs" justify="center" className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Login Account
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12}>
              <TextField
                name="mobileNumber"
                variant="outlined"
                type="number"
                required
                fullWidth
                label="Mobile Number"
                value={mobileNumber}
                onChange={(evt) => {
                  setMobileNumber(evt.target.value);
                }}
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
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center" justify="flex-start">
                <Grid item xs={6}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setIsResetPassword(true);
                    }}
                  >
                    Reset Password
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Grid>
                {/* <Grid>
                                <Checkbox
                                    checked={isOTP}
                                    onChange={() => {setisOTP(!isOTP)}}
                                    color="primary"
                                />
                            </Grid> */}
                {/* {
                                isOTP &&
                                <Grid>
                                    <Button size="small" variant="outlined" color="primary">Re-send OTP</Button>
                                </Grid>
                            } */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <ResetPassword
        isOpen={isResetpassword}
        onClose={() => {
          setIsResetPassword(false);
        }}
      />
    </>
  );
}
