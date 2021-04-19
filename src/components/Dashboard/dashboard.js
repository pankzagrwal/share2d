import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent 
} from '@material-ui/core';

import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import CurrentProspects from '../Prospects/prospects.js';
import RecentCommission from '../RecentCommission/recentCommission.js';

import { getLead, updateLead } from './actions.js'

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
      backgroundColor: '#f64e60',
      height: '130px',
      color: 'white',
  },
  name: {
      padding: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(-7),
    marginBottom: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    borderRadius: '15px',
    boxShadow: 'none',
  },
  received: {
      backgroundColor: '#fff4de',
      color: '#ffa800'
  },
  refered: {
      backgroundColor: '#e1f0ff',
      color: '#3699ff'
  },
  comission: {
      backgroundColor: '#ffe2e5',
      color: '#f64e60'
  },
  refer: {
      backgroundColor: '#c9f7f5',
      color: '#1bc5bd'
  }
}));


const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleRefer = () => {
        history.push("/ReferBuddy");
    }

    const updateLeadHandle = (payload) => {
        dispatch(updateLead(payload))
    }

    React.useEffect(() => {
        dispatch(getLead({
            type: 'bussiness'
        }))
        dispatch(getLead({
            type: 'promoter'
        }))
    }, [dispatch])

    const store = useSelector(state => state?.user?.store) || {};
    // Prospects sent
    const promoters = useSelector(state => state?.prospects?.promoter ?? []);
    // Prospects coming
    const business = useSelector(state => state?.prospects?.business ?? [])
    const {
        store_name
    } = store

    return (
        <>
        <Grid container className={classes.backgroundContainer}>
            <Grid item xs={12}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography variant="h6" className={classes.name}>
                            Welcome {store_name}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Container maxWidth='xs' justify='center' className={classes.paper}>
            <Grid container spacing={3} justify='space-between' alignItems="center">
                <Grid item xs={12}>
                    <Grid container justify="space-around" spacing={2} className={classes.summaryCard}>
                        <Grid item xs={6}>
                            <Card className={`${classes.box} ${classes.received}`}>
                                <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Total Customers
                                </Typography>
                                <Typography variant="overline" display="block">
                                    28 out of 99 leads
                                </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={`${classes.box} ${classes.refered}`}>
                                <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Active Promoters
                                </Typography>
                                <Typography variant="overline" display="block">
                                    2341
                                </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={`${classes.box} ${classes.comission}`}>
                                <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Comission Earned
                                </Typography>
                                <Typography variant="overline" display="block">
                                    40000 out of 12 leads
                                </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={`${classes.box} ${classes.refer}`}>
                                <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Acive Businesses
                                </Typography>
                                <Typography variant="overline" display="block" onClick={handleRefer}>
                                    1209
                                </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CurrentProspects promoters={promoters} business={business} updateLead={updateLeadHandle} />
                </Grid>
                <Grid item xs={12} >
                    <RecentCommission />
                </Grid>
            </Grid>

        </Container>
        </>
    )
}

export default Dashboard;
