/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/Store/store';
import PushNotificationConfig from './src/Utils/notificationsConfig';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { QueryClient } from '@tanstack/react-query';

// const queryClient = new QueryClient();
const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* </QueryClientProvider> */}
    </PersistGate>
  </Provider>
);

PushNotificationConfig.configrations();
messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

AppRegistry.registerComponent(appName, () => RNRedux);
