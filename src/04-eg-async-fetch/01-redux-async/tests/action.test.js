import fetchMock from 'fetch-mock'
import { exampleData_apiSubreddit } from '../model'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { actionNames, asyncActions } from '../action'


describe('[Action, asyncAction]', ()=>{
  // Set up fake store
  const middlewares = [thunk]
  const fakeCreateStore = configureStore(middlewares)
  const fakeRootReducer = {}
  const initialState = fakeRootReducer
  const fakeStore = fakeCreateStore(initialState)

  const fakeDispatch = fakeStore.dispatch

  afterEach(()=>{
    fetchMock.restore()
    fakeStore.clearActions()
  })

  it('thunk_fetchSubreddit should dispatch start and success', async()=>{
    fetchMock.get('https://www.reddit.com/r/reactjs.json', exampleData_apiSubreddit)
    await fakeDispatch(asyncActions.thunk_fetchSubreddit())

    const dipatchedActions = fakeStore.getActions()
    // dipatchedActions =
    // [ { type: 'fetchSubreddit_start' },
    //   { type: 'fetchSubreddit_success',
    //     payload: { posts: [Array], receivedAt: 1570074061361 } } ]

    expect(dipatchedActions[0].type).toBe(actionNames.fetchSubreddit_start)
    expect(dipatchedActions[1].type).toBe(actionNames.fetchSubreddit_success)
  })

  it('thunk_fetchSubreddit should dispatch start and fail', async()=>{
    fetchMock.get('https://www.reddit.com/r/reactjs.json', 500)
    await fakeDispatch(asyncActions.thunk_fetchSubreddit())

    const dipatchedActions = fakeStore.getActions()
    // dispatchedActions =
    // [ { type: 'fetchSubreddit_start' },
    //   { type: 'fetchSubreddit_fail',
    //     error: 'Error: HTTP error, status = 500' } ]

    expect(dipatchedActions[0].type).toBe(actionNames.fetchSubreddit_start)
    expect(dipatchedActions[1].type).toBe(actionNames.fetchSubreddit_fail)
  })
})

