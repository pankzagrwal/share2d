import React from 'react';
import {
    Button,
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
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  summaryCard: {
      flexWrap: 'noWrap'
  }
}));

const summaryList = [
    {
        title: 'Customer Received',
        value: 12
    },
    {
        title: 'Customer Refereed',
        value: 10
    },
    {
        title: 'Commision Received',
        value: 23
    }
]

const SummaryCard = ({
    title,
    value
}) => {
    return (
        <Card raised>
            <CardContent>
            <Typography variant="subtitle1" gutterBottom>
               {title}
            </Typography>
            <Typography variant="overline" display="block">
                {value}
            </Typography>
            </CardContent>
        </Card>
    )
}

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();

    const handleRefer = () => {
        history.push("/ReferBuddy");
    }
    return (
         <Container maxWidth='xs' justify='center' className={classes.paper}>
                <Grid container spacing={3} justify='space-between' alignItems="center">
                    <Grid item xs={12}>
                       <Grid container justify='space-between'>
                            <Grid item>
                                Welcome XYZ
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" onClick={handleRefer}>
                                    Refer
                                </Button>
                            </Grid>
                       </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="space-between" spacing={2} className={classes.summaryCard}>
                            {summaryList.map(({title, value}) => (
                                <Grid key={value} item>
                                    <SummaryCard title={title} value={value} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <CurrentProspects />
                    </Grid>
                    <Grid item xs={12}>
                        <Referee />
                    </Grid>
                    <Grid item xs={12}>
                        <Referal />
                    </Grid>
                </Grid>

         </Container>
    )
}

export default Dashboard;