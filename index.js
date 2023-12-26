/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/Store/store';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { QueryClient } from '@tanstack/react-query';

// const queryClient = new QueryClient();
const RNRedux = () => (
  <Provider store={store}>
      {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* </QueryClientProvider> */}
  </Provider>
);


AppRegistry.registerComponent(appName, () => RNRedux);
