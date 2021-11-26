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
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
// ----------------------------------------------------------------------

export default function Order() {
  const [open, setOpen] = useState(false);


  

  return (
    <Page title="Commandes">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Liste de Commandes
          <Fab variant="extended" size="small" color="primary" aria-label="add" style={{float: 'right'}}>
            <NavigationIcon sx={{ mr: 1 }} />
            Nouvelle commaande
          </Fab>
        </Typography>
        <ProductList products={PRODUCTS} />
      </Container>
      <AddOrder open={open} handleClose={setOpen} />
    </Page>
  );
}
