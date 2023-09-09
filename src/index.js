import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import './index.css';
import App from './components/App/App';

const feelingReducer = (state = [], action) => {
    if(action.type === 'INPUT_FEELING') {
      return action.payload
    }
    return state;
  }
  
  
  // be sure to combine your reducers!
  const storeInstance = createStore(
    // reducers,
    combineReducers(
      {
        feelingReducer,
      }
    ),
    applyMiddleware(logger)
  )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance} >
          <App/>
        </Provider>
    </React.StrictMode>
);
