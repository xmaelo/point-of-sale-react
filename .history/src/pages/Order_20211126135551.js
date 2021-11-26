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
// ----------------------------------------------------------------------

export default function Order() {

  return (
    <Page title="Commandes">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Liste de Commandes
        </Typography>
        <ProductList products={PRODUCTS} />
      </Container>
      <AddOrder/>
    </Page>
  );
}
