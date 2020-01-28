import React from 'react'

import { render, fireEvent, RenderResult } from '@testing-library/react'
import {
  createStore, Store,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import {App} from '../app'
import {
  rootReducer,
  history
} from '../store'

import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { History } from  'history'


describe('[Connected Router]', () => {
  beforeEach(()=>{ })
  afterEach(()=>{ })

  describe('Navigate to page a', () => {

    it('Connected Router Redux show navigate to page a', () => {
      const store = createStore(
        rootReducer,
        {},
        applyMiddleware(routerMiddleware(history), thunk)
      )

      const {
        getByText
      } = renderWithConnectedRouter(history, store)(<App />)

      const storeBeforeNavigate = store.getState()
      expect(storeBeforeNavigate.router.location.pathname).toBe('/')

      const link = getByText('Link to: /page a')
      fireEvent.click(link)

      const storeAfterNavigate = store.getState()
      expect(storeAfterNavigate.router.location.pathname).toBe('/a')
    })

    it('Make sure jsDom is clear from state from previous state', () => {
      const store = createStore(
        rootReducer,
        {},
        applyMiddleware(routerMiddleware(history), thunk)
      )

      const {
        queryByText,
      } = renderWithConnectedRouter(history, store)(<App />)

      const pageContentA = queryByText('Page content a')
      expect(pageContentA).toBeNull()
      const storeBeforeNavigate = store.getState()
      expect(storeBeforeNavigate.router.location.pathname).toBe('/')
    })
  })

  it('router can handle no match', async () => {
      const store = createStore(
        rootReducer,
        {},
        applyMiddleware(routerMiddleware(history), thunk)
      )

      const {
        findByText,
      } = renderWithConnectedRouter(history, store)(<App />)

      history.push('/does-not-exit')

      ;await findByText('Page no match')

      const storeBeforeNavigate = store.getState()
      expect(storeBeforeNavigate.router.location.pathname).toBe('/does-not-exit')
    })
})



function renderWithConnectedRouter(_history: History, _store:Store){
  return function( ui:React.ReactNode,):RenderResult {
    return render(
      <Provider store={_store}>
        <ConnectedRouter history={_history}>
          {ui}
        </ConnectedRouter>
      </Provider>
    )
  }
}
