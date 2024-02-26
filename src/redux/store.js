import { createStore } from 'redux';
import { persistStore , persistReducer } from 'redux-persist'
import reducers from './reducers/index';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key:'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig,reducers);
export const store = createStore(
  persistedReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export  const persistor = persistStore(store);