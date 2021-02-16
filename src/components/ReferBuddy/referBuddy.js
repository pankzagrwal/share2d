import React from "react";
import {
    Button,
    Container,
    Grid,
    Checkbox,
    TextField,
} from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import StoreList from '../StoreList/storeList'
import IndustryDialog from './industryDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  industry: {
      paddingBottom: theme.spacing(2)
  },
  search: {
      paddingBottom: theme.spacing(2)
  }
}));

export default function ReferBuddy() {
    const classess = useStyles()
    const [isIndustryOpen, setIsIndustryOpen] = React.useState(false)
    return (
        <>
            <Container maxWidth='xs' justify='center' className={classess.paper}>
                <Grid container spacing={3} justify='space-between' alignItems="center" className={classess.industry}>
                    <Grid item>
                        Industry: {'XYZ'}
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" size="small" onClick={() => {setIsIndustryOpen(true)}}>
                            Change Industry
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        Search on popularity
                    </Grid>
                    <Grid Item>
                        <Checkbox color="primary" />
                    </Grid>
                </Grid>
                <Grid container spacing={4} direction='column' className={classess.search}>
                    <Grid item>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <StoreIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Search Store" />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" size="small">
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <StoreList />
            </Container>
            <IndustryDialog isOpen={isIndustryOpen} selectedIndustr={0} onClose={(value) => {setIsIndustryOpen(false)}}/>
        </>
    )
}