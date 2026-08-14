// import { createStore, applyMiddleware} from 'redux';
// import {configureStore} from 'reduxjs'
// import logger from 'redux-logger';

// import rootReducer from './root-reducer';

// const middlewares =[logger];

// const store = createStore(rootReducer, applyMiddleware(...middlewares))

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import {fetchCollectionsStart} from './shop/shop.sagas';

import rootReducer from './root-reducer'
import rootSaga from './root-saga';
const sagaMiddleware =createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>{
    const middleswares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      },
    });
  
  if (process.env.NODE_ENV ==='development') {
    middleswares.concat(logger);
    return middleswares.concat(logger, sagaMiddleware);
  }
  return middleswares.concat(sagaMiddleware);
},
 devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {store, persistor};