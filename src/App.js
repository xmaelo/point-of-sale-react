import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import store from './reducer';
import {request_get, onOrder, websocketUrl} from './config'

// ----------------------------------------------------------------------

function BaseApp(){
  const dispatch = useDispatch()

  function onSocket(){
    const socket = new window.WebSocket(websocketUrl);

    dispatch({type: "SAVE_SOCKET", socket: socket})
    socket.addEventListener("open", function() {
        console.log("CONNECTED");
    });
    
    socket.addEventListener("message", function(e) {
        try
        {
            const message = JSON.parse(e.data);
            console.log('message +++', message)
            //onOrder(message.random)
            onOrder(message)
        }
        catch(e)
        {
            // Catch any errors
        }
    });
    socket.onerror = function(event) {
      console.error("Erreur WebSocket observée :", event);
      onSocket()
    };
    socket.onclose = function(event) {
      console.log("La WebSocket est désormais fermée.");
      onSocket()
    };
  }

  React.useEffect(function(){
    onSocket()
  }, [])

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  )
}
export default function App() {
  return (
    <Provider store={store}>
      <BaseApp/>
    </Provider>
  );
}
