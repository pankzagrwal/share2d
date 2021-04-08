import React from 'react';
import {
    Button,
    Grid,
    Typography,
    Avatar,
    Tabs,
    Tab
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


import One from '../../assets/profile/1.jpg'
import Two from '../../assets/profile/2.jpg'
import Three from '../../assets/profile/3.jpg'
import Four from '../../assets/profile/4.jpg'
import Five from '../../assets/profile/5.jpg'
import Six from '../../assets/profile/6.jpg'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
    height: '30px'
  },
  container: {
    marginTop: theme.spacing(3)
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  textMuted: {
    fontSize: '12px',
    color: '#b5b5c3'
  },
  buttonBlock: {
    display: 'block'
  },
  dot: {
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#b5b5c3',
  },
  collapse: {
    marginLeft: theme.spacing(7)
  },
  pay: {
    boxShadow: 'none',
    backgroundColor: '#8950fc',
    color: 'white',
    fontSize: '12px',
    marginRight: '12px'
  },
  netOff: {
    boxShadow: 'none',
    backgroundColor: '#f64e60',
    color: 'white',
    fontSize: '12px'
  },
  status_pending: {
      color: 'orange'
  },
    status_success: {
        color: 'green'
    },
    actionItem: {
        marginTop: theme.spacing(2)
    },
    callText: {
      padding: 0,
      textTransform: 'none'
    }
}));

const profilePicMap = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six
}

export const CommissionGive = ({
    name='Merchant Name',
    status = 'pending',
    isStore
}) => {
    const classes = useStyles();
    const profile = Math.floor(Math.random() * 6) + 1;
    return (
        <Grid container alignItems='center' spacing={1} direction='row' className={classes.container}>
            <Grid item xs={2}>
                <Button href={'tel:9552530381'} className={classes.buttonBlock}>
                <Avatar src={profilePicMap[profile]} className={classes.small}/>
                </Button>
            </Grid>
            <Grid item container xs={8}  alignItems='center'>
                <Grid item container direction='row' alignItems='center'>
                <Button href={'tel:9552530381'} className={classes.callText}>
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>
                  </Button>
                </Grid>
                {
                  !isStore &&
                  <Grid item  direction='row' alignItems='center'>
                  <Button href={'tel:9552530381'} className={classes.callText}>
                      <Typography variant='caption'>
                          {/* Referred By: AAA Industires */}
                          Customer name
                      </Typography>
                    </Button>
                  </Grid>
                }
                {
                    status === 'pending' &&
                    <Grid item container className={classes.actionItem}>
                        <Button variant="contained" size='small' className={classes.pay} color='primary'>
                            Pay
                        </Button>
                        <Button variant="contained" size='small' className={classes.netOff} color='secondary'>
                            Net Off
                        </Button>
                    </Grid>
                }
            </Grid>
            <Grid item container xs={2} alignItems='center'>
                {
                    status !== 'cancelled' &&
                    <Grid item>
                        &#8377; 1234
                    </Grid>
                }
                <Grid item className={[classes.textMuted, classes[`status_${status}`]]}>
                    {status}
                </Grid>
            </Grid>
        </Grid>
    )
}

export const CommissionReceive = ({
    name = 'Merchant Name',
    status = 'pending',
    isStore,
    onClick = () => {}
}) => {
    const classes = useStyles();
    const profile = Math.floor(Math.random() * 6) + 1;
    return (
        <Grid container alignItems='center' spacing={1} direction='row' className={classes.container} onClick={onClick}>
        <Grid item xs={2}>
            <Button href={'tel:9552530381'} className={classes.buttonBlock}>
            <Avatar src={profilePicMap[profile]} className={classes.small}/>
            </Button>
        </Grid>
        <Grid item container xs={8}  alignItems='center'>
            <Grid item container direction='row' alignItems='center'>
            <Button href={'tel:9552530381'} className={classes.callText}>
              <Typography variant='subtitle2'>
                  {name}
              </Typography>
            </Button>
            </Grid>
            {
              !isStore &&
              <Grid item container direction='row' alignItems='center'>
              <Button href={'tel:9552530381'} className={classes.callText}>
                <Typography variant='caption'>
                  Customer Name
                </Typography>
              </Button>
              </Grid>
            }
            <Grid item container  className={classes.textMuted} direction='column'>
            <span>
                &#8377; 1234
            </span>
            <span className={classes[`status_${status}`]}>
                {status}
            </span>
            </Grid>
        </Grid>
        </Grid>
    )
}


const RecentCommission = () => {
    const [tabId, setTabId] = React.useState(0)
    const  handleChange = (evt, value) => {
      setTabId(value)
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Recent Commission
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Tabs value={tabId} onChange={handleChange}>
            <Tab label="Receive"  id = {0} />
            <Tab label="Give" id = {1} />
          </Tabs>
        </Grid>
        {
          tabId === 0 &&
          <Grid item xs={12}>
            <CommissionReceive />
            <CommissionReceive />
            <CommissionReceive />
            <CommissionReceive />
          </Grid>
        }
        {
          tabId === 1 &&
          <Grid item xs={12}>
            <CommissionGive />
            <CommissionGive />
            <CommissionGive />
            <CommissionGive />
            <CommissionGive />
          </Grid>
        }
        <Grid item xs={10}>
          <Button  color='primary'>View All</Button>
        </Grid>
      </Grid>
    )

}

export default RecentCommission;
