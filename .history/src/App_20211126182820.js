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
import {request_get, onOrder} from './config'

// ----------------------------------------------------------------------

function BaseApp(){
  const dispatch = useDispatch()


  React.useEffect(function(){
    const socket = new window.WebSocket("ws://localhost:3001");

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
            onOrder(message.random)
        }
        catch(e)
        {
            // Catch any errors
        }
    });
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
