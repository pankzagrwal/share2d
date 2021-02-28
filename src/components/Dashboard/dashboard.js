import React from 'react';
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
import Referee from '../Referee/referee.js';
import Referal from '../Referal/referal.js';

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
      backgroundColor: '#f64e60',
      height: '200px',
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
    const handleRefer = () => {
        history.push("/ReferBuddy");
    }


    return (
        <>
        <Grid container className={classes.backgroundContainer}>
            <Grid item xs={12}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography variant="h6" className={classes.name}>
                            Welcome Pankaj
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
         <Container maxWidth='xs' justify='center' className={classes.paper}>
                <Grid container spacing={3} justify='space-between' alignItems="center">
                    <Grid item xs={12}>
                        <Grid container justify="space-around" spacing={2} className={classes.summaryCard}>
                            <Grid item xs={5}>
                                <Card className={`${classes.box} ${classes.received}`}>
                                    <CardContent>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Received
                                    </Typography>
                                    <Typography variant="overline" display="block">
                                        12
                                    </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5}>
                                <Card className={`${classes.box} ${classes.refered}`}>
                                    <CardContent>
                                    <Typography variant="subtitle1" gutterBottom>
                                     Refered
                                    </Typography>
                                    <Typography variant="overline" display="block">
                                        3
                                    </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5}>
                                <Card className={`${classes.box} ${classes.comission}`}>
                                    <CardContent>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Comission
                                    </Typography>
                                    <Typography variant="overline" display="block">
                                        100.43
                                    </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5}>
                                <Card className={`${classes.box} ${classes.refer}`}>
                                    <CardContent>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Refer
                                    </Typography>
                                    <Typography variant="overline" display="block" onClick={handleRefer}>
                                        Customer
                                    </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <CurrentProspects />
                    </Grid>
                    <Grid item xs={12} >
                        <Referee />
                    </Grid>
                    <Grid item xs={12}>
                        <Referal />
                    </Grid>
                </Grid>

         </Container>
        </>
    )
}

export default Dashboard;
