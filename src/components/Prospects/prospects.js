import React from 'react';
import {
    Button,
    Grid,
    Typography,
    Avatar,
    Collapse,
    FormControlLabel,
    RadioGroup,
    Radio,
    Paper,
    InputBase,
    Divider,
    IconButton
} from '@material-ui/core';
import Send from '@material-ui/icons/Send';

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

const Prospect = () => {
  const classes = useStyles();
  const profile = React.useMemo(() => Math.floor(Math.random() * 6) + 1, []);
  const [isExpandable, setIsExpandable] = React.useState(false);
  const [status, setStatus] = React.useState('')
  const handleChange = (evt) => {
    setStatus(evt.target.value)
  }
  return (
    <Grid container justify={'space-between'} alignItems='center' spacing={1} direction='row' className={classes.container}>
      <Grid item xs={2}>
        <Button href={'tel:9552530381'} className={classes.buttonBlock}>
          <Avatar src={profilePicMap[profile]} className={classes.small}/>
        </Button>
      </Grid>
      <Grid item container xs={8}  alignItems='center'>
        <Grid item container direction='row' alignItems='center'>
          <Typography variant='subtitle2'>
            Ricky Hunt
          </Typography>
        </Grid>
        <Grid item container  className={classes.textMuted} direction='column'>
          <span>
            Description goes here about the requirement
          </span>
          <span>
            Shop Name goes here
          </span>
        </Grid>
      </Grid>
      <Grid item xs={2} className={classes.dot} onClick={() => setIsExpandable(!isExpandable)}>
        <span >...</span>
      </Grid>
      <Grid item xs={10}>
        <Collapse in={isExpandable}>
          <Grid container className={classes.collapse}>
            <Grid item xs={12}>
              <RadioGroup name="status" value={status} onChange={handleChange} color='primary' row className={classes.radioGroup}>
                <FormControlLabel value="notSold" control={<Radio size='small'/>} label="Not Sold" />
                <FormControlLabel value="sold" control={<Radio size='small'/>} label="Sold" />
              </RadioGroup>
            </Grid>
            {
              status === 'sold' &&
              <Grid item xs={6}>
                  <Paper component="form" className={classes.paper}>
                    <InputBase
                      className={classes.input}
                      placeholder="Sold Amount"
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary">
                      <Send fontSize="small"/>
                    </IconButton>
                  </Paper>
              </Grid>
            }
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  )
}

const Prospects = () => {

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Current Prospects
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' gtterBottom>
            Reach out to prospects before they reach
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Prospect />
          <Prospect />
          <Prospect />
          <Prospect />
        </Grid>
        <Grid item xs={10}>
          <Button  color='primary'>View All</Button>
        </Grid>
      </Grid>
    )
}

export default Prospects;
