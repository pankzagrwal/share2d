import React from "react";
import { useDispatch } from 'react-redux'
import {
    Button,
    Grid,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { dropLead } from './actions.js'

const useStyles = makeStyles((theme) => ({
  textField: {
      width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function LeadDialog ({
    onClose,
    isOpen,
    storeName,
    storeId,
    offerId
}) {
    const classess = useStyles();
    const dispatch = useDispatch()
    const [custName, setCustname] = React.useState('');
    const [custPhone, setCustPhone] = React.useState('');
    const [requirement, setRequirement] = React.useState('');

    const handleSubmit = () => {
        dispatch(dropLead({
            customer: {
                name: custName,
                phone: custPhone
            },
            item_description: requirement,
            offer: offerId
        })).then(handleClose)
    }
    const handleClose = () => {
        onClose();
        window.open(`https://wa.me/${custPhone}?text=hello ${custName}, How are you`, '_blank');
    }
    return (
        <Dialog onClose={handleClose}  open={isOpen} fullScreen >
            <IconButton onClick={handleClose} className={classess.closeButton}>
                <CloseIcon />
            </IconButton>
            <DialogTitle>Drop Lead</DialogTitle>
            <DialogContent>
                <Grid container  spacing={2} alignItems='center' justify='center'>
                    <Grid item xs={12}>
                        <TextField
                            className={classess.textField}
                            id="storeName"
                            value={storeName}
                            label="Store Name"
                            disabled
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classess.textField}
                            id="customerName"
                            value={custName}
                            label="Customer Name"
                            onChange={(evt) => {setCustname(evt.target.value)}}
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classess.textField}
                            id="customerNumber"
                            value={custPhone}
                            label="Customer Number"
                            type='number'
                            onChange={(evt) => {setCustPhone(evt.target.value)}}
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classess.textField}
                            id="itemDescription"
                            value={requirement}
                            label="Requirement"
                            type='text'
                            multiline
                            onChange={(evt) => {setRequirement(evt.target.value)}}
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}
