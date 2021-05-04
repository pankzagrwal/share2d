import React from "react";
import { useSelector } from 'react-redux'
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
    isOpen,
}) {
    const classess = useStyles()
    const [value, setValue] = React.useState(selectedIndustry)
    const industriesList = useSelector(state => state?.config?.industries ?? [])

    const handleClose = () => {
        onClose(value)
    }
    const handleChange = (e) => {
        setValue(e.target.value)
        onClose({
            id: e.currentTarget.dataset.value,
            name: e.currentTarget.textContent
        })
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
                        {
                            industriesList.map((item, i) => {
                                return <MenuItem value={item.id} name={item.name} key={i}>{item.name}</MenuItem>
                            })
                        }
                    </TextField>
                </Grid>
            </Grid>
            </DialogContent>
        </Dialog>
    )
}
