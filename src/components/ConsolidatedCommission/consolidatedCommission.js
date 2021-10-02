import React from "react";
import { Container, Grid, Typography, Tabs, Tab } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import {
  CommissionGive,
  CommissionReceive,
} from "../RecentCommission/recentCommission.js";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { getTransactions, settleTransaction } from "./actions";

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
    backgroundColor: "#f64e60",
    height: "50px",
    marginBottom: "25px",
    color: "white",
  },
  name: {
    padding: theme.spacing(1),
  },
  store: {
    width: "100%",
  },
  container: {
    marginBottom: "65px",
  },
  pay: {
    boxShadow: "none",
    backgroundColor: "#8950fc",
    color: "white",
    fontSize: "12px",
    marginRight: "12px",
  },
  netOff: {
    boxShadow: "none",
    backgroundColor: "#f64e60",
    color: "white",
    fontSize: "12px",
  },
  actionItem: {
    marginTop: theme.spacing(2),
  },
}));

const ConsolidatedCommission = () => {
  const [tabId, setTabId] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const transaction = useSelector(
    (state) => state?.transaction?.allMerchant ?? []
  );
  const otherStore = useSelector((state) => state?.config?.otherStore ?? {});
  const handleChange = (evt, value) => {
    setTabId(value);
  };
  const clickHandle = (evt, id) => {
    history.push(`/allCommissions?id=${id}`);
    evt.stopPropagation();
  };

  React.useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  return (
    <>
      <Grid container className={classes.backgroundContainer}>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" className={classes.name}>
                Consolidated Commission
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Container maxWidth="xs" justify="center" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <Typography variant='subtitle2'>
                        Total Customer: 8, Confirmed Sent Leads: 12
                    </Typography> */}
            {/* <Typography variant='overline'>
                        You Owe/get Rs 12340
                    </Typography> */}
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Tabs value={tabId} onChange={handleChange}>
                <Tab label="All" id={0} />
                <Tab label="Receive" id={1} />
                <Tab label="Give" id={2} />
              </Tabs>
            </Grid>
            {tabId === 0 && (
              <Grid item xs={12}>
                {transaction.map((item, index) => {
                  const { amount, to_id, id } = item;
                  let content;
                  if (amount < 0) {
                    content = (
                      <CommissionReceive
                        isStore
                        name={otherStore[to_id]?.store_name}
                        amount={amount}
                        phone={otherStore[to_id]?.phone}
                        onClick={(evt) => {
                          clickHandle(evt, id);
                        }}
                      />
                    );
                  } else {
                    content = (
                      <CommissionGive
                        isStore
                        id={id}
                        name={otherStore[to_id]?.store_name}
                        amount={amount}
                        phone={otherStore[to_id]?.phone}
                        onClick={(evt) => {
                          clickHandle(evt, id);
                        }}
                        onSettle={(id) => {
                          dispatch(settleTransaction(id));
                        }}
                      />
                    );
                  }

                  return content;
                })}
              </Grid>
            )}
            {tabId === 1 && (
              <Grid item xs={12}>
                Coming Soon !
              </Grid>
            )}
            {tabId === 2 && (
              <Grid item xs={12}>
                Coming Soon !
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ConsolidatedCommission;
