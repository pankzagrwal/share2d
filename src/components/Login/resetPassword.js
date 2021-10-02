import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import { getOTP, reset } from "./actions.js";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function ResetPassword({ isOpen, onClose }) {
  const classess = useStyles();
  const dispatch = useDispatch();
  const [isOTPGenerated, setIsOTPGenerated] = React.useState(false);
  const [custPhone, setCustPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOTP] = React.useState();

  const handleSubmitOTP = () => {
    dispatch(
      getOTP({
        mobileNumber: custPhone,
      })
    ).then((res) => {
      if (!res.isError) {
        setIsOTPGenerated(true);
      }
    });
  };
  const handleSubmitPassword = () => {
    dispatch(
      reset({
        mobileNumber: custPhone,
        password,
        otp,
      })
    ).then((res) => {
      console.log(res);
    });
  };
  const handleClose = () => {
    setIsOTPGenerated(false);
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={isOpen} fullScreen>
      <IconButton onClick={handleClose} className={classess.closeButton}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12}>
            <TextField
              className={classess.textField}
              id="customerNumber"
              value={custPhone}
              label="Mobile Number"
              type="number"
              onChange={(evt) => {
                setCustPhone(evt.target.value);
              }}
              disabled={isOTPGenerated}
            ></TextField>
          </Grid>
          {isOTPGenerated && (
            <Grid item xs={12}>
              <TextField
                className={classess.textField}
                id="password"
                value={password}
                label="New Password"
                type="text"
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              ></TextField>
            </Grid>
          )}
          {isOTPGenerated && (
            <Grid item xs={12}>
              <TextField
                className={classess.textField}
                id="otp"
                value={otp}
                label="OTP"
                type="number"
                onChange={(evt) => {
                  setOTP(evt.target.value);
                }}
              ></TextField>
            </Grid>
          )}
          {!isOTPGenerated && (
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmitOTP}
              >
                GET OTP
              </Button>
            </Grid>
          )}

          {isOTPGenerated && (
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmitPassword}
              >
                Update Password
              </Button>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
