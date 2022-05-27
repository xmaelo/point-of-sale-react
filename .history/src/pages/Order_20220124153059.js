import * as React from 'react';
import { useFormik } from 'formik';
import { useState, useRef } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import AddOrder from '../components/AddOrder'
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { request_get } from 'src/config';
// ----------------------------------------------------------------------

export default function Order() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch() 
  const orders = useSelector(p => p.orders)
  const p = useSelector(p => p)

  console.log('***********************', p)

  React.useEffect(async function(){
    await onGetOrder()
  }, [])

  async function onGetOrder(){
    try {
      const result =  await request_get('commandes?encaisse=false&order[id]=desc')
      if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
        console.log( "result['hydra:member']", result['hydra:member'])
        dispatch({type: 'CMD', orders: result['hydra:member']})
        await onGetOrder()
      }
    } catch (error) {
      console.log('onLoadTyeOnWait', error)
      await onGetOrder()
    }

  }


  

  return (
    <Page title="Commandes">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Liste de Commandes
          <Fab variant="extended" size="small" color="primary" aria-label="add" style={{float: 'right'}} onClick={() => setOpen(true)} >
            <AddIcon sx={{ mr: 1 }} />
            Nouvelle commaande
          </Fab>
        </Typography>
        <ProductList products={orders} />
      </Container>
      <AddOrder open={open} handleClose={setOpen} />
    </Page>
  );
}
