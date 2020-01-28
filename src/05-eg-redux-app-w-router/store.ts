import {
  createStore,
  combineReducers, applyMiddleware, compose
} from 'redux'
import thunk from 'redux-thunk'



// RootReducer
const rootReducer = combineReducers({
  foo: (s={})=>s
})
type TrootReducer = ReturnType<typeof rootReducer>


// Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


export {
  store,
  rootReducer,
  TrootReducer
}
