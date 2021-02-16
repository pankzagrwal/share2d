import React from 'react';
import {
    Button,
    Grid,
    Typography,
    Divider 
} from '@material-ui/core';

import PhoneIcon from '@material-ui/icons/Phone';

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
            <Button  href={`tel:9552530381`} size='small' endIcon={<PhoneIcon />} color='primary'>
              9552530381
            </Button>
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
           4000
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  )
}

const Referal = () => {

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Referal Commission
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

export default Referal;