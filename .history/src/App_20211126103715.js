// routes
import { Provider } from 'react-redux';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import store from './reducer';

// ----------------------------------------------------------------------

function BaseApp(){
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
