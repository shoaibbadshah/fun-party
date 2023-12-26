import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import storage from '@react-native-async-storage/async-storage';
import rootReducer from './Reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'theme'], // only user will be persisted
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

export { store, persistor };
