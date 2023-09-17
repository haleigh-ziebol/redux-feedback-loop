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
  else if(action.type === 'EXIT_BACK') {
    return false
  }
  return state;
}

const deleteIDReducer = (state = '', action) => {
  if(action.type === 'DELETE_ID') {
    return action.payload
  }
  return state;
}

const deleteDialogReducer = (state = false, action) => {
  if(action.type === 'OPEN_DIALOG') {
    return true
  }
  else if(action.type === 'CLOSE_DIALOG') {
    return false
  }
  return state;
}

const editViewReducer = (state = false, action) => {
  if(action.type === 'TOGGLE_EDIT') {
    return !state
  }
  return state;
}

const flaggedNotificationReducer = (state = '', action) => {
  if(action.type === 'UPDATE_FLAGGED') {
    return action.payload
  }
  return state;
}

const loginModalReducer = (state = true, action) => {
  if(action.type === 'SET_SIGNUP') {
    return false //meaning not logging in; signing up
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
        goBackReducer,
        deleteIDReducer,
        deleteDialogReducer,
        editViewReducer,
        flaggedNotificationReducer,
        loginModalReducer
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
