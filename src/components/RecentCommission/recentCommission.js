import React from 'react';
import {
    Button,
    Grid,
    Typography,
    Avatar,
    Tabs,
    Tab,
    Dialog,
    DialogActions,
    DialogTitle 
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
      color: 'orange',
      fontWeight: 'bold'
  },
    status_success: {
        color: 'green',
        fontWeight: 'bold'
    },
    actionItem: {
        marginTop: theme.spacing(1)
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
    id,
    name,
    amount,
    phone,
    status = 'pending',
    isStore,
    isReadonly,
    onClick = () => {},
    onSettle = () => {}
}) => {
    const classes = useStyles();
    const profile = Math.floor(Math.random() * 6) + 1;
    const [showConfirm, setShowConfirm] = React.useState(false)
    const handleSettle = (evt) => {
      evt.stopPropagation();
      setShowConfirm(false);
      onSettle(id)
    }
    return (
        <Grid container alignItems='center' spacing={1} direction='row' className={classes.container} onClick={onClick}>
            <Grid item xs={2}>
                <Button onClick={(evt) => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  window.open(`tel:${phone}`)
                }} className={classes.buttonBlock}>
                <Avatar src={profilePicMap[profile]} className={classes.small}/>
                </Button>
            </Grid>
            <Grid item container xs={7}  alignItems='center'>
                <Grid item container direction='row' alignItems='center'>
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>
                </Grid>
                {
                    !isReadonly &&
                    <Grid item container className={classes.actionItem}>
                        {/* <Button variant="contained" size='small' className={classes.pay} color='primary'>
                            Pay
                        </Button> */}
                        <Button variant="contained" size='small' className={classes.netOff} color='secondary' onClick={(evt) => {
                            evt.stopPropagation();
                            setShowConfirm(true);
                        }}>
                            Settle
                        </Button>
                    </Grid>
                }
            </Grid>
            <Grid item container xs={3} alignItems='flex-end' direction='column'>
                {
                    status !== 'cancelled' &&
                    <Grid item className={classes.status_success}>
                        &#8377; {Math.round(amount)}
                    </Grid>
                }
                <Grid item className={[classes.textMuted]}>
                    You'll Give
                </Grid>
            </Grid>
              <Dialog
                open={showConfirm}
                onClose={() => {setShowConfirm(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogActions>
                  <Button onClick={(evt) => { evt.stopPropagation(); setShowConfirm(false)}} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={(evt) => {handleSettle(evt, )}} color="secondary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
        </Grid>
    )
}

export const CommissionReceive = ({
    name,
    amount,
    phone,
    status = 'pending',
    isStore,
    onClick = () => {}
}) => {
    const classes = useStyles();
    const profile = Math.floor(Math.random() * 6) + 1;
    return (
        <Grid container alignItems='center' spacing={1} direction='row' className={classes.container} onClick={onClick}>
          <Grid item xs={2}>
              <Button onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                window.open(`tel:${phone}`)
              }} className={classes.buttonBlock}>
              <Avatar src={profilePicMap[profile]} className={classes.small}/>
              </Button>
          </Grid>
          <Grid item container xs={7}  alignItems='center'>
              <Grid item container direction='row' alignItems='center'>
                <Typography variant='subtitle2'>
                    {name}
                </Typography>
              </Grid>
          </Grid>
            <Grid item container xs={3} alignItems='flex-end' direction='column'>
                {
                    status !== 'cancelled' &&
                    <Grid item className={classes.status_pending}>
                        &#8377; {Math.round(amount)}
                    </Grid>
                }
                <Grid item className={[classes.textMuted]}>
                    You'll Get
                </Grid>
            </Grid>
        </Grid>
    )
}


const RecentCommission = ({
  receive,
  give,
  isReadonly
}) => {
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
            {
              receive.map((item, index) => {
                const {
                  first_party_detail: {
                    store_name: name,
                    phone
                  } = {},
                  amount
                } = item;
                return <CommissionReceive key={index} name={name} amount={amount} phone={phone}/>
              })
            }
          {receive.length === 0 &&
            <Typography variant='caption'>
              No Data Available
            </Typography>
          }
          </Grid>
        }
        {
          tabId === 1 &&
          <Grid item xs={12}>
            {
              give.map((item, index) => {
                    const {
      second_party_detail: {
        store_name: name = 'Merchant Name',
      } = {},
      amount
    } = item;
                return <CommissionGive key={index} name={name} amount={amount} isReadonly={isReadonly}/>
              })
            }
          {give.length === 0 &&
            <Typography variant='caption'>
              No Data Available
            </Typography>
          }
          </Grid>
        }
        {/* <Grid item xs={10}>
          <Button  color='primary'>View All</Button>
        </Grid> */}
      </Grid>
    )

}


export default RecentCommission;
