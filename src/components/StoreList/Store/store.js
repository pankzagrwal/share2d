import React from "react";
import {
    Button,
    Grid,
    Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export default function Store ({
    onClick,
    name,
    commission
}) {
    const handleSend = () => {
        onClick({
            storeName: name,
            id: 1
        })
    }
    return (
        <Grid container item xs={12} direction="column" >
            <Grid item>
                <Typography variant="subtitle2">
                    Store Name
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="caption" display="block" gutterBottom>
                    00.00
                </Typography>
            </Grid>
            <Grid item >
                <Button size='small' color='primary' variant="contained"  endIcon={<SendIcon />} onClick={handleSend}>
                    Send
                </Button>
            </Grid>
        </Grid>
    )
}