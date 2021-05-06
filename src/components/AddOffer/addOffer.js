import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Container,
    TextField,
    FormControl,
    Grid,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Divider,
    Link
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import { saveOffer} from './actions.js';

const useStyles = makeStyles((theme) => ({

  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  textField: {
      width: '100%',
      marginTop:  theme.spacing(2),
      marginBottom:  theme.spacing(2)
  },
  button: {
      boxShadow: 'none'
  }
}));

export default function AddOffer () {
    const classes = useStyles();
    const dispatch = useDispatch();


    const offer = useSelector(state => state?.user?.offer ?? {});

    const {
        id,
        type,
        flat_commission
    } = offer;

    const [commission, setCommission] = React.useState(flat_commission);
    const [commissionType, setCommissionType] = React.useState(type || '0');

    const handleCommissionTypeChange = (evt) => {
        setCommissionType(evt.target.value)
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        dispatch(saveOffer({
            id,
            type: parseInt(commissionType, 10),
            flat_commission: commission
        }))
    }


    return (
        <Container maxWidth='xs' justify='center' className={classes.paper}>
            <Typography variant="overline" display="block">
                Enter the commisssion, you would like to offer
            </Typography>
            <Divider light/>
             <form onSubmit={handleSubmit} autoComplete='off' className={classes.form}>
                 <Grid container spacing={2} alignItems='center' justify='center'>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Commission Type</FormLabel>
                            <RadioGroup  row value={commissionType} onChange={handleCommissionTypeChange}>
                                <FormControlLabel value={'1'} control={<Radio color="primary" />} label="Percentage" />
                                <FormControlLabel value={'0'} control={<Radio color="primary" />} label="Flat" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="commission"
                            variant="outlined"
                            type="number"
                            required
                            fullWidth
                            label={`Commission in ${commissionType === '1' ? '%' : 'Rs'}`}
                            onChange={(evt) => {setCommission(evt.target.value)}}
                            value={commission}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Submit
                        </Button>
                    </Grid>
                 </Grid>
             </form>
            <Typography variant="caption" display="block">
                Please <Link href='/' variant="body2"> skip </Link> if you would like to  work as Referrer only.
            </Typography>
        </Container>
    )
} 
