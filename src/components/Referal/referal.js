import React from "react";
import { Button, Grid, Typography, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import One from "../../assets/profile/1.jpg";
import Two from "../../assets/profile/2.jpg";
import Three from "../../assets/profile/3.jpg";
import Four from "../../assets/profile/4.jpg";
import Five from "../../assets/profile/5.jpg";
import Six from "../../assets/profile/6.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  textMuted: {
    fontSize: "12px",
    color: "#b5b5c3",
  },
  buttonBlock: {
    display: "block",
  },
}));

const profilePicMap = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
};

const Prospect = () => {
  const classes = useStyles();
  const profile = Math.floor(Math.random() * 6) + 1;
  return (
    <Grid
      container
      alignItems="center"
      spacing={1}
      direction="row"
      className={classes.container}
    >
      <Grid item xs={2}>
        <Button href={"tel:9552530381"} className={classes.buttonBlock}>
          <Avatar src={profilePicMap[profile]} className={classes.small} />
        </Button>
      </Grid>
      <Grid item container xs={8} alignItems="center">
        <Grid item container direction="row" alignItems="center">
          <Typography variant="subtitle2">Brad Simmons</Typography>
        </Grid>
        <Grid item container className={classes.textMuted} direction="column">
          <span>&#8377; 1234</span>
          <span>Pending</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Referal = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Referal Commission
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Prospect />
        <Prospect />
        <Prospect />
        <Prospect />
      </Grid>
      <Grid item xs={10}>
        <Button color="primary">View All</Button>
      </Grid>
    </Grid>
  );
};

export default Referal;
