import React from "react";
import {
    List,
    ListItem 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LeadDialog from '../LeadDialog/leadDialog';

import Store from './Store/store'

const useStyles = makeStyles((theme) => ({
  list: {
      width: '100%',
      paddingBottom: theme.spacing(7)
  }
}));


export default function StoreList ({
    list
}) {
    const classes = useStyles();
    const loader = React.useRef();
    const [selectedStore, setSelectedStore] = React.useState({})

    React.useEffect(() => {
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
         };
         const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
         }
    }, []);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            console.log('makeAPI')
        }
    }
    const handleClick = (obj) => {
        setSelectedStore(obj)
    }
    const handleClose = () => {
        setSelectedStore({})
    }
    return (
        <List className={classes.list}>
            {
                [1,2,3,4,5,6,7,8,9,10].map(() => {
                    return (
                        <ListItem>
                            <Store onClick={handleClick}/>
                        </ListItem>
                    )
                })
            }
            <div ref={loader}>Loading</div>
            <LeadDialog
                isOpen={!!selectedStore.id}
                storeName = {selectedStore.storeName}
                storeId = {selectedStore.id}
                onClose={handleClose}
            />
        </List>
    )
}