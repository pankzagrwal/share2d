import React from 'react';
import {
    Container,
    Grid,
    Typography,
    Tabs,
    Tab,
    NativeSelect
} from '@material-ui/core';

import {
    CommissionGive,
    CommissionReceive
} from '../RecentCommission/recentCommission.js';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
      backgroundColor: '#f64e60',
      height: '50px',
      marginBottom: '25px',
      color: 'white',
  },
  name: {
      padding: theme.spacing(1)
  },
  store: {
      width: '100%'
  },
  container: {
      marginBottom: '65px'
  }
}));

const AllCommmission = () => {
    const [tabId, setTabId] = React.useState(0);
    const classes = useStyles()
    const  handleChange = (evt, value) => {
      setTabId(value)
    }
    return (

        <>
        <Grid container className={classes.backgroundContainer}>
            <Grid item xs={12}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography variant="h6" className={classes.name}>
                           Commission Details
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Container maxWidth='xs' justify='center' className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <NativeSelect
                        value={''}
                        onChange={() => {}}
                        name="age"
                        color='primary'
                        className={classes.store}
                        inputProps={{ 'aria-label': 'age' }}
                        >
                        <option value="">Select Store</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12} container>
                <Grid item xs={12}>
                <Tabs value={tabId} onChange={handleChange}>
                    <Tab label="All"  id = {0} />
                    <Tab label="Receive"  id = {1} />
                    <Tab label="Give" id = {2} />
                </Tabs>
                </Grid>
                {
                tabId === 0 &&
                <Grid item xs={12}>
                    <CommissionReceive />
                    <CommissionGive status='success'/>
                    <CommissionReceive  status='success'/>
                    <CommissionGive />
                    <CommissionReceive status='cancelled'/>
                </Grid>
                }
                {
                tabId === 1 &&
                <Grid item xs={12}>
                    <CommissionReceive status='pending'/>
                    <CommissionReceive status='success'/>
                    <CommissionReceive status='cancelled'/>
                    <CommissionReceive status='pending'/>
                </Grid>
                }
                {
                tabId === 2 &&
                <Grid item xs={12}>
                    <CommissionGive status='success'/>
                    <CommissionGive />
                    <CommissionGive />
                    <CommissionGive status='success'/>
                    <CommissionGive />
                </Grid>
                }
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default AllCommmission;
