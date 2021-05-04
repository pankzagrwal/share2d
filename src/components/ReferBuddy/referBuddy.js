import React from "react";
import {
    Button,
    Container,
    Grid,
    Paper,
    InputBase,
    Divider,
    IconButton,
    Switch,
    Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import StoreList from '../StoreList/storeList'
import IndustryDialog from './industryDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backgroundContainer: {
      backgroundColor: '#f64e60',
      height: '50px',
      marginBottom: '25px',
      color: 'white',
  },
  name: {
      padding: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  industry: {
      paddingBottom: theme.spacing(2)
  },
  search: {
      paddingBottom: theme.spacing(2)
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #b5b5c3',
    boxShadow: 'none',
    position: 'sticky',
    top: '0'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  popularity: {
      fontSize: '12px',
      color: '#b5b5c3'
  }
}));

export default function ReferBuddy() {
    const classess = useStyles();
    const industriesList = useSelector(state => state?.config?.industries ?? []);
    const user  = useSelector(state => state.user) || {};
    const {
        store: {
            industry: storeIndustry
        } = {}
    } = user
    const [isIndustryOpen, setIsIndustryOpen] = React.useState(false);
    const [isPopularity, setIsPopularity] = React.useState(false);
    const [industry, setIndustry] = React.useState({})

    React.useEffect(() => {
        const filteredIndustry = industriesList.filter(item => item.id === storeIndustry)[0];
        filteredIndustry && setIndustry(filteredIndustry)
    }, [storeIndustry, industriesList])
    return (
        <>
        <Grid container className={classess.backgroundContainer}>
            <Grid item xs={12}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography variant="h6" className={classess.name}>
                           Stores
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
            <Container maxWidth='xs' justify='center' className={classess.paper}>
                <Grid container spacing={4} direction='column' className={classess.search}>
                    <Grid item xs={12}>
                        <Paper component="form" className={classess.root}>
                        <InputBase
                            className={classess.input}
                            placeholder="Search Stores"
                        />
                        <Divider className={classess.divider} orientation="vertical" />
                        <IconButton color="primary" type="submit" className={classess.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3} justify='space-between' alignItems="center" className={classess.industry}>
                    <Grid item>
                        <Button variant="outlined" color="primary" size="small" onClick={() => {setIsIndustryOpen(true)}} endIcon={<FilterListIcon />}>
                            {industry.name}
                        </Button>
                    </Grid>
                    <Grid item>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                            <Switch size='small' checked={isPopularity} onChange={() => {setIsPopularity(!isPopularity)}} name="checkedC" />
                        </Grid>
                        <Grid item className={classess.popularity}>Popularity</Grid>
                        </Grid>
                    </Typography>
                    </Grid>
                </Grid>
                <StoreList industry={industry.id} />
            </Container>
            <IndustryDialog value={industry} isOpen={isIndustryOpen} selectedIndustry={industry.id} onClose={(value) => {setIndustry(value); setIsIndustryOpen(false)}}/>
        </>
    )
}
