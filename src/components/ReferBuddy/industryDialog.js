import React from "react";
import {
    Grid,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
      width: '100%',
  }
}));

export default function IndustryDialog ({
    onClose,
    selectedIndustry,
    isOpen
}) {
    const classess = useStyles()
    const [value, setValue] = React.useState(selectedIndustry)
    const handleClose = () => {
        onClose(value)
    }
    const handleChange = (e) => {
        setValue(e.target.value)
        onClose(e.target.value)
    }
    return (
        <Dialog onClose={handleClose}  open={isOpen} fullScreen >
            <DialogTitle>Change Industry</DialogTitle>
            <DialogContent>
            <Grid container  spacing={2} alignItems='center' justify='center'>
                <Grid item xs={12}>
                    <TextField
                        className={classess.textField}
                        select
                        id="industry"
                        value={value}
                        label="Select Industry"
                        onChange={handleChange}
                        >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            </DialogContent>
        </Dialog>
    )
}