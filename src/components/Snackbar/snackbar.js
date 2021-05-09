import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // '& > * + *': {
    //   marginTop: theme.spacing(2),
    // },
  },
}));

export default function SnackbarComp() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const alertData = useSelector(state => state?.config?.alert ?? [])
  const {
      severity,
      message,
      isOpen
  } = alertData;


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({
        type: 'SET_ALERT',
        payload: {
            isOpen: false,
            severity: '',
            message: ''
        }
    })
  };

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>

    </div>
  );
}