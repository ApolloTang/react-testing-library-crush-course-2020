import { T_appState } from '../store'

import fetchMock from 'fetch-mock'
import { exampleData_apiSubreddit } from '../model'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { asyncActions, actions } from '../action'

import {
  mapAppStateToProps,
  mapDispatchToProps,
  getIsoStringFromDatestamp
} from  '../selector'



describe('[getIsoStringFromDatestamp()]', ()=>{
  it('Should handle undefined', () => {
    expect(getIsoStringFromDatestamp(undefined)).toBeUndefined()
  })

  it('Should convert time stamp to iso-string', () => {
    expect(getIsoStringFromDatestamp(1570084484065)).toBe('2019-10-03T06:34:44.065Z')
  })
})



describe('[Selector, mapStoreToProps]', ()=>{
  const receivedAt =  Date.now()
  const receivedAt_isoString = getIsoStringFromDatestamp(receivedAt)

  const fakeStore = {
    receivedAt: receivedAt,
    posts: 'fakePosts',
    isLoading: 'fakeIsLoading',
    errorMsg: 'fakeErrorMsg'
  } as unknown as T_appState // <--- force casting here b/c we
                             //  don't care about the correct shape of
                             //  this object, it is a test fixture

  it('Should select the correct property', () => {
    expect(mapAppStateToProps(fakeStore)).toEqual(
      {
        date: receivedAt_isoString,
        posts: 'fakePosts',
        isLoading: 'fakeIsLoading',
        errorMsg: 'fakeErrorMsg'
      }
    )
  })
})



describe('[Selector, mapDipatchToProps (integration test on AsyncAction)]', ()=>{
  const middlewares = [thunk]
  const fakeCreateStore = configureStore(middlewares)

  const initialState = {}
  const fakeStore = fakeCreateStore(initialState)

  const fakeDispatch = fakeStore.dispatch

  const {
    dispatch_fetchSubredditPosts
  } = mapDispatchToProps(fakeDispatch)



  describe('[calling dispatch_fetchSubredditPosts()]', ()=>{
    it('should call aysnActions.thunk_fetchSubreddit()', ()=>{
      const spy = jest.spyOn(asyncActions, 'thunk_fetchSubreddit')
      dispatch_fetchSubredditPosts()
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('when response is ok, it should dispatch start and success action', async ()=>{
      fetchMock.get('https://www.reddit.com/r/reactjs.json', exampleData_apiSubreddit)

      const spy1 = jest.spyOn(actions, 'fetchSubreddit_start')
      const spy2 = jest.spyOn(actions, 'fetchSubreddit_success')

      dispatch_fetchSubredditPosts()

      expect(spy1).toHaveBeenCalled()
      await new Promise(rs=>{setTimeout(rs, 3000)}) // need to wait abit here for fetchMock to reponse
      expect(spy2).toHaveBeenCalled()

      spy1.mockRestore()
      spy2.mockRestore()
      fetchMock.restore()
    })

    it('when response is no ok, it should dispatch start and fail action', async ()=>{
      fetchMock.get('https://www.reddit.com/r/reactjs.json', 200)

      const spy1 = jest.spyOn(actions, 'fetchSubreddit_start')
      const spy2 = jest.spyOn(actions, 'fetchSubreddit_fail')

      dispatch_fetchSubredditPosts()

      expect(spy1).toHaveBeenCalled()
      await new Promise(rs=>{setTimeout(rs, 3000)}) // need to wait abit here for fetchMock to reponse
      expect(spy2).toHaveBeenCalled()

      spy1.mockRestore()
      spy2.mockRestore()
      fetchMock.restore()
    })
  })
})

