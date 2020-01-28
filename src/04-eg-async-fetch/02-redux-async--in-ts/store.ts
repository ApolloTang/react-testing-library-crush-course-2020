import {createStore} from 'redux'
import {applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import { reducer } from './reducer'


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

type T_appState = ReturnType<typeof reducer>

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export {
  store,
  T_appState
}
