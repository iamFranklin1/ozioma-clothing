// import { createStore, applyMiddleware} from 'redux';
// import {configureStore} from 'reduxjs'
// import logger from 'redux-logger';

// import rootReducer from './root-reducer';

// const middlewares =[logger];

// const store = createStore(rootReducer, applyMiddleware(...middlewares))

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './root-reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store