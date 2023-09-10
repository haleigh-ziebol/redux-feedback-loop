import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import './index.css';
import App from './components/App/App';

const feelingReducer = (state = 0, action) => {
    if(action.type === 'INPUT_FEELING') {
      return action.payload
    }
    return state;
}
const understandingReducer = (state = 0, action) => {
  if(action.type === 'INPUT_UNDERSTANDING') {
    return action.payload
  }
  return state;
}

const supportReducer = (state = 0, action) => {
  if(action.type === 'INPUT_SUPPORT') {
    return action.payload
  }
  return state;
}

const commentReducer = (state = '', action) => {
  if(action.type === 'INPUT_COMMENT') {
    return action.payload
  }
  return state;
}

const feedbackReducer = (state = '', action) => {
  if(action.type === 'INPUT_FEEDBACK') {
    return action.payload
  }
  return state;
}

const goBackReducer = (state = false, action) => {
  if(action.type === 'UPDATE') {
    return true
  }
  if(action.type === 'EXIT_BACK') {
    return false
  }
  return state;
}
  
  const storeInstance = createStore(
    // reducers,
    combineReducers(
      {
        feelingReducer,
        understandingReducer,
        supportReducer,
        commentReducer,
        feedbackReducer,
        goBackReducer
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
