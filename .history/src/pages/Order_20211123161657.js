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
import Websocket from 'react-websocket';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function Order() {
  const [openFilter, setOpenFilter] = useState(false);
  let wsRef = useRef(null);
  const [socket, setSocket] = useState(null)

  React.useEffect(function(){
    const socket = new window.WebSocket("ws://localhost:3001");
    setSocket(socket)

    socket.addEventListener("open", function() {
        console.log("CONNECTED");
    });
    
    socket.addEventListener("message", function(e) {
        console.log(e.data);
        try
        {
            const message = JSON.parse(e.data);
            console.log('message', message)
        }
        catch(e)
        {
            // Catch any errors
        }
    });
  }, [])

 function sendMessage(){
  const message = {
    name: "text",
    message: "text"
  };
  socket.send(JSON.stringify(message));
 }

  

  return (
    <Page title="Commandes">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Liste de Commandes
        </Typography>
        <br/>
        <br/>
        <button onClick={() => sendMessage("Hello")} >Send Message</button>
        <br/>
        <br/>
        <br/>
        <br/>
        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
