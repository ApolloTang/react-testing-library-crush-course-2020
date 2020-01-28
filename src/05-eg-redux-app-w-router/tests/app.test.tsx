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
  rootReducer
} from '../store'

import {Router} from 'react-router-dom'
import { createMemoryHistory, History } from 'history'


describe('[Router]', () => {
  beforeEach(()=>{ })
  afterEach(()=>{ })

  describe('Navigate to page a', () => {
    it('Router can navigate to page a', async () => {
      const history = createMemoryHistory()
      const store = createStore(rootReducer, applyMiddleware(thunk))

      const {
        getByText,
        findByText
      } = renderWithStoreAndRouter(history, store)(<App />)

      const link = getByText('Link to: /page a')
      fireEvent.click(link)
      await findByText('Page content a')
    })

    it('Make sure jsDom is clear from state from previous state', () => {
      const history = createMemoryHistory()
      const store = createStore(rootReducer, applyMiddleware(thunk))

      const {
        queryByText,
      } = renderWithStoreAndRouter(history, store)(<App />)

      const pageContentA = queryByText('Page content a')
      expect(pageContentA).toBeNull()
    })
  })

  it('router can handle no match', async () => {
    const history = createMemoryHistory()
    const store = createStore(rootReducer, applyMiddleware(thunk))

    const {
      findByText
    } = renderWithStoreAndRouter(history, store)(<App />)

    history.push('/does-not-exit')

    await findByText('Page no match')
  })
})




function renderWithStoreAndRouter(_history: History, _store:Store){
  return function( ui:React.ReactNode,):RenderResult {
    return render(
      <Provider store={_store}>
        <Router history={_history}>
          {ui}
        </Router>
      </Provider>
    )
  }
}
