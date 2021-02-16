import React from "react";
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
    storeId
}) {
    const classess = useStyles()
    const handleClose = () => {
        onClose()
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
                            value={'Store Name'}
                            label="Store Name"
                            disabled
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classess.textField}
                            id="customerName"
                            value={''}
                            label="Customer Name"
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classess.textField}
                            id="customerNumber"
                            value={''}
                            label="Customer Number"
                            type='number'
                            >
                        </TextField>
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
                </Grid>
            </DialogContent>
        </Dialog>
    )
}