import React from 'react';
import {
    Container,
    Grid,
    Typography,
    Tabs,
    Tab,
    Link,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import {getTransactions} from './actions.js';

import {
    CommissionGive,
    CommissionReceive
} from '../RecentCommission/recentCommission.js';


import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

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
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    const transactions = useSelector((state) => state?.transaction?.merchant ?? [])
    const userId = useSelector(state => state?.user?.id);
    const history = useHistory();
    React.useEffect(() => {
        dispatch(getTransactions(id))
    }, [id, dispatch]);

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
                {/* <Grid item xs={12}>
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
                </Grid> */}
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
                <>
                <Grid item xs={12}>
                    {
                        transactions.map((item, index) => {
                            let content;
                            const {
                                store_name,
                                phone,
                            } = item.second_party_detail;
                            if (userId === item.first_party) {
                                content = <CommissionGive name={store_name} amount={item.amount} phone={phone} isReadonly/>
                            }
                            else {
                                content = <CommissionReceive  name={store_name} amount={item.amount} phone={phone}/>
                            }
                            return content;
                        })
                    }
                    {
                        transactions.length === 0 && 'No Transaction found'
                    }
                </Grid>
                <Grid item xs={12} onClick={(evt) => {
                    history.push(`/allSettled?id=${id}`);
                    evt.stopPropagation();
                }}>
                    <Typography variant="button" display="block" gutterBottom>
                        <Link color='secondary' onClick={(e) => e.preventDefault()}>Settled Transaction.. </Link>
                    </Typography>
                </Grid>
                </>
                }
                {
                tabId === 1 &&
                <Grid item xs={12}>
                    Coming Soon !
                </Grid>
                }
                {
                tabId === 2 &&
                <Grid item xs={12}>
                    Coming Soon !
                </Grid>
                }
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default AllCommmission;
