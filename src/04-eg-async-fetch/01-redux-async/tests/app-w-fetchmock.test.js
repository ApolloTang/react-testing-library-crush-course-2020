import fetchMock from 'fetch-mock'

import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { render, wait} from '@testing-library/react'

import { ConnectedApp } from '../app'
import { reducer } from '../reducer'
import {
  exampleData_apiSubreddit,
  apiSerializer_subreddit,
} from '../model'
import { api } from '../api'


const examplePosts = apiSerializer_subreddit(exampleData_apiSubreddit).posts


describe('[Using mock-fetch]', () => {
  // --------------------
  // setup and tear down
  // --------------------
  afterEach(()=>{
    fetchMock.restore()
  })


  // --------------
  //  test start
  // --------------

  it('fetchMock works and the return mockPosts is serialized', async () => {
    fetchMock.get('https://www.reddit.com/r/reactjs.json', exampleData_apiSubreddit)
    const mockFetchData_serialized = await api.getPosts()
    expect(mockFetchData_serialized.posts).toEqual(examplePosts)
  })


  it('When subreddit post is showing there should be no loading message', async () => {
    fetchMock.get('https://www.reddit.com/r/reactjs.json', exampleData_apiSubreddit)

    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      () => {
        getByText(new RegExp(examplePosts[0].author, 'i'))
        getByText(new RegExp(examplePosts[0].title, 'i'))

        getByText(new RegExp(examplePosts[1].author, 'i'))
        getByText(new RegExp(examplePosts[1].title, 'i'))

        expect(queryByText(/loading/i)).toBeNull()
      }
    )
  })


  it('fetchMock can return 500 and api.getPosts() will throw', async () => {
    fetchMock.get('https://www.reddit.com/r/reactjs.json', 500)

    try {
      await api.getPosts()
    } catch (error) {
      expect(error.toString()).toContain(500)
    }
  })


  it('App should show error message container with text 500', async () => {
    fetchMock.get('https://www.reddit.com/r/reactjs.json', 500)

    const {
      getByTestId,
      getByText
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      () => {
        getByTestId('error-msg')
        getByText(/500/i)
      }
    )
  })
})


function renderWithStore(
  ui
) {
  const store = createStore(reducer, applyMiddleware(thunk))
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}
