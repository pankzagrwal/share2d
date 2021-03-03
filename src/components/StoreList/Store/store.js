import React from "react";
import {
    Button,
    Grid,
    Typography,
} from '@material-ui/core';
import storeImage from '../../../assets/store.png';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
      marginBottom: theme.spacing(2)
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  textMuted: {
    fontSize: '12px',
    color: '#b5b5c3'
  },
  pay: {
    width: '100%',
    boxShadow: 'none',
    fontSize: '12px',
    marginRight: '12px'
  },
  netOff: {
    width: '100%',
    boxShadow: 'none',
    backgroundColor: '#f64e60',
    color: 'white',
    fontSize: '12px'
  }
}));

export default function Store ({
    onClick,
    name,
    commission
}) {
    const classes = useStyles();
    const handleSend = () => {
        onClick({
            storeName: name,
            id: 1
        })
    }
    return (
        <Grid container direction='row' alignItems='center' spacing={1} className={classes.container}>
            <Grid item xs={3}>
                <img src={storeImage} alt='store' width='60px' height='60px'/>
            </Grid>
            <Grid container item xs={9} direction="column" >
                <Grid item>
                    <Typography variant="subtitle2">
                        Store Name
                    </Typography>
                </Grid>
                <Grid item className={classes.textMuted}>
                    <Typography variant="caption" >
                        Sushant Lok Gurgaon
                    </Typography>
                </Grid>
                <Grid item className={classes.textMuted}>
                    <Typography variant="caption" display="block" gutterBottom>
                        &#8377; 1234
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={12} alignItems='center' justify='space-between'>
                <Grid item xs={5}>
                    <Button variant="outlined" size='small' className={classes.pay} color='primary'>
                        Call
                    </Button>
                </Grid>
                <Grid item xs={5}>
                    <Button variant="contained" size='small' className={classes.netOff} color='secondary' onClick={handleSend}>
                        Refer
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
