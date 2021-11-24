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
import Websocket from 'react-websocket';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function Order() {
  const [openFilter, setOpenFilter] = useState(false);
  const wsRef = useRef(null);

  function handleData(data) {
    alert(data);
  }
  function handleOpen()  {
    alert("connected:)");
  }
  function handleClose() {
    alert("disconnected:(");
  }

  function sendMessage(message){
    wsRef.sendMessage(message);
  }

  return (
    <Page title="Commandes">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Liste de Commandes
        </Typography>
        <button onClick={() => sendMessage("Hello")} >Send Message</button>
        <Websocket 
          url='ws://localhost:3001' 
          onMessage={handleData}
          onOpen={handleOpen} 
          onClose={handleClose}
          reconnect={true}
          debug={true}
          ref={Websocket => {
            wsRef = Websocket;
          }}
        />
        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
