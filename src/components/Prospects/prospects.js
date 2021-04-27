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
    IconButton,
    Tabs,
    Tab
} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

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
  },
    pay: {
    boxShadow: 'none',
    backgroundColor: '#8950fc',
    color: 'white',
    fontSize: '12px',
    marginRight: '12px'
  },
  netOff: {
    boxShadow: 'none',
    backgroundColor: '#f64e60',
    color: 'white',
    fontSize: '12px'
  },
}));

const profilePicMap = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six
}

const ProspectComing = ({prospect, updateLead}) => {
  const classes = useStyles();
  const profile = React.useMemo(() => Math.floor(Math.random() * 6) + 1, []);
  const [isExpandable, setIsExpandable] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [soldAmount, setSoldAmount] = React.useState();
  const {
    id,
    business_detail: {
      store_name
    } = {},
    customer: {
      name,
    } = {},
    item_description
  } = prospect;
  const handleChange = (evt) => {
    setStatus(evt.target.value);
    if (evt.target.value === 'notSold') {
      handleSold(3)
    }
  }

  const handleSold = (status) => {
    updateLead({
      id: id,
      item_description,
      price: soldAmount,
      status
    })
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
            {name}
          </Typography>
        </Grid>
        <Grid item container  className={classes.textMuted} direction='column'>
          <span>
            {item_description}
          </span>
          <span>
            Refered by: {store_name}
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
                        value={soldAmount}
                        onChange={(evt) => setSoldAmount(evt.target.value)}
                      />
                      <Divider className={classes.divider} orientation="vertical" />
                      <IconButton color="primary">
                        <Send fontSize="small" onClick={() => {
                          handleSold(2)
                        }}/>
                      </IconButton>
                    </Paper>
                </Grid>
              }
                <Grid item container className={classes.actionItem}>
                    <Button variant="contained" size='small' className={classes.pay} color='primary' startIcon={<SmartphoneIcon />}>
                        Customer 
                    </Button>
                    <Button variant="contained" size='small' className={classes.netOff} color='secondary ' startIcon={<SmartphoneIcon />}>
                        Merchant 
                    </Button>
                </Grid>
            </Grid>
          </Collapse>
        </Grid>
    </Grid>
  )
}

const ProspectSent = ({prospect}) => {
  const {
    customer: {
      name
    } = {},
    item_description,
    business_detail: {
      store_name = 'Merchant Name'
    } = {}
  } = prospect;
  const classes = useStyles();
  const profile = React.useMemo(() => Math.floor(Math.random() * 6) + 1, []);
  return (
    <Grid container justify={'space-between'} alignItems='center' spacing={1} direction='row' className={classes.container}>
      <Grid item xs={2}>
        <Button href={'tel:9552530381'} className={classes.buttonBlock}>
          <Avatar src={profilePicMap[profile]} className={classes.small}/>
        </Button>
      </Grid>
      <Grid item container xs={10}  alignItems='center'>
        <Grid item container direction='row' alignItems='center'>
          <Typography variant='subtitle2'>
            {name}
          </Typography>
        </Grid>
        <Grid item container  className={classes.textMuted} direction='column'>
          <span>
           {item_description}
          </span>
          <span>
            Referred To: {store_name}
          </span>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Prospects = ({
  promoters,
  business,
  updateLead
}) => {
    const [prospectsId, setProspectsId] = React.useState(0);

    const  handleProspectsChange = (evt, value) => {
      setProspectsId(value)
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Active Prospects
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Tabs value={prospectsId} onChange={handleProspectsChange}>
            <Tab label="Coming"  id = {0} />
            <Tab label="Sent" id = {1} />
          </Tabs>
        </Grid>
        {
          prospectsId === 0 &&
          <Grid item xs={12}>
            {
              business.map((item, index) => {
                return <ProspectComing key={index} prospect={item} updateLead={updateLead} />
              })
            }
          {business.length === 0 &&
            <Typography variant='caption'>
              No Data Available
            </Typography>
          }
          </Grid>
        }
        {
          prospectsId === 1 &&
          <Grid item xs={12}>
            {
              promoters.map((item, index) => {
                return <ProspectSent key ={index} prospect={item} />
              })
            }
          {promoters.length === 0 &&
            <Typography variant='caption'>
              No Data Available
            </Typography>
          }
          </Grid>
        }
        {/* <Grid item xs={10}>
          {business.length === 0 &&
            <Typography variant='caption'>
              No Data Available
            </Typography>
          }
          <Button  color='primary'>View All</Button>
        </Grid> */}
      </Grid>
    )
}

export default Prospects;
