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
    Radio
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import { saveOffer} from './actions.js';

const useStyles = makeStyles((theme) => ({

  form: {
    width: '100%',
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
    const [commissionType, setCommissionType] = React.useState(type);

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
             <form onSubmit={handleSubmit} autoComplete='off' className={classes.form}>
                 <Grid container spacing={2} alignItems='center' justify='center'>
                    <Grid item xs={12}>
                        <TextField
                            name="commission"
                            variant="outlined"
                            type="number"
                            required
                            fullWidth
                            label="Commission"
                            onChange={(evt) => {setCommission(evt.target.value)}}
                            value={commission}
                        />
                    </Grid>
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
        </Container>
    )
} 
