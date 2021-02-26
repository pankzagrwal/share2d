import React from 'react';
import {
    Button,
    Grid,
    Typography,
    Divider 
} from '@material-ui/core';


const Prospect = () => {

  return (
    <Grid container justify='center' alignItems='center' spacing={1}>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems='center' spacing={1}>
          <Grid item>
            <Typography variant="subtitle2">
              Name
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='overline'>
                Pending
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} justify='space-between'>
        <Grid item>
          <Typography variant="caption">
            500
          </Typography>
        </Grid>
        <Grid item>
          <Button size='small' variant='outlined' color='primary'>
            Pay
          </Button>
        </Grid>
        <Grid item>
          <Button size='small' variant='outlined' color='primary'>
            Net off
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  )
}

const Referee = () => {

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Referee Commission
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Prospect />
          <Prospect />
          <Prospect />
          <Prospect />
        </Grid>
      </Grid>
    )
}

export default Referee;
