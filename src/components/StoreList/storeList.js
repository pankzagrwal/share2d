import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
    List,
    ListItem 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LeadDialog from '../LeadDialog/leadDialog';

import Store from './Store/store'
import {getStores} from './actions.js'

const useStyles = makeStyles((theme) => ({
  list: {
      width: '100%',
      paddingBottom: theme.spacing(7)
  }
}));


export default function StoreList ({
    industry,
    list
}) {
    const classes = useStyles();
    const loader = React.useRef();
    const [selectedStore, setSelectedStore] = React.useState({})
    const dispatch = useDispatch();
    const storeList = useSelector((store) => {
        return store?.stores?.results ?? [];
    })

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

    React.useEffect(() => {
        dispatch(getStores({industry}))
    }, [dispatch, industry])

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
               storeList.map((storeItem, index) => {
                   const {
                       id,
                       store_name,
                       address,
                       phone,
                       offer
                   } = storeItem
                    return (
                        <ListItem key={index}>
                            <Store id={id} name={store_name} address={address} phone={phone} offer={offer} onClick={handleClick}/>
                        </ListItem>
                    )
                })
            }
            {/* <div ref={loader}>Loading</div> */}
            <LeadDialog
                isOpen={!!selectedStore.id}
                storeName = {selectedStore.storeName}
                storeId = {selectedStore.id}
                offerId = {selectedStore.offerId}
                onClose={handleClose}
            />
        </List>
    )
}
