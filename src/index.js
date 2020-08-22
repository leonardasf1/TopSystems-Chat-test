import React from 'react';
import { render } from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  )
))

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'))

