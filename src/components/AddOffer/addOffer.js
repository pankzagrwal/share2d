import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import {
    Button,
    MenuItem,
    Container,
    TextField,
    FormControl,
    Typography,
    Grid,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {getIndustries} from './actions.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  textField: {
      width: '100%',
      marginTop:  theme.spacing(2),
      marginBottom:  theme.spacing(2)
  }
}));

export default function AddOffer () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [industry, setIndustry] = React.useState('')
    //  const [industries, setIndustries] = React.useState([])
    const [geoPosition, setGeoPosition] = React.useState({});
    const [commission, setCommission] = React.useState('');
    const [commissionType, setCommissionType] = React.useState('flat');

    const industriesList = useSelector(state => state?.config?.industries ?? [])

    // React.useEffect(() => {
    //     setIndustries(industriesList)
    // }, [industriesList])

    React.useEffect(() => {
        dispatch(getIndustries())
        getGeoLocation();
    }, [dispatch])
    const handleCommissionTypeChange = (evt) => {
        console.log(evt)
        setCommissionType(evt.target.value)
    }
    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                setGeoPosition({
                    latitude,
                    longitude
                })
            })
        }

    }

    const handleSkip = () => {
        history.push("/");
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log({
            geoPosition,
            commissionType,
            industry,
            commission
        })
    }


    return (
        <Container maxWidth='xs' justify='center' className={classes.paper}>
            <Typography variant="h4" component="h2" gutterBottom>
                Add Offer
            </Typography>
             <form onSubmit={handleSubmit} autoComplete='off' className={classes.form}>
                 <Grid container spacing={2} alignItems='center' justify='center'>
                    <Grid item xs={12}>
                        {/* <FormControl variant="outlined" xs={12}> */}
                            {/* <InputLabel id="industryLabel">Industries</InputLabel> */}
                            <TextField
                                select
                                id="industry"
                                value={industry}
                                onChange={(evt) => {setIndustry(evt.target.value)}}
                                label="Select Industry"
                                className={classes.textField}
                                >
                                {   
                                    industriesList.map((item, i) => {
                                        return <MenuItem value={item.name} key={i}>{item.name}</MenuItem>
                                    })
                                }
                            </TextField>
                        {/* </FormControl> */}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="commission"
                            variant="outlined"
                            type="number"
                            required
                            fullWidth
                            label="Commission"
                            onChange={(evt) => {setCommission(evt.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Commission Type</FormLabel>
                            <RadioGroup  row value={commissionType} onChange={handleCommissionTypeChange}>
                                <FormControlLabel value="percentage" control={<Radio color="primary" />} label="Percentage" />
                                <FormControlLabel value="flat" control={<Radio color="primary" />} label="Flat" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={handleSkip}
                        >
                            Skip for now
                        </Button>
                    </Grid>
                 </Grid>
             </form>
        </Container>
    )
}
