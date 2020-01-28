import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { render, wait, fireEvent } from '@testing-library/react'

import { ConnectedApp } from '../app'
import { reducer } from '../reducer'


import { api } from '../api'



jest.mock('../api', ()=>(
  {
    api: {
      getPosts: () => {}
    }
  }
))
const spyApiGetPosts = jest.spyOn(api, 'getPosts')


const mockPosts1 = [
  { author: 'author1', title: 'title1', id: '1' },
  { author: 'author2', title: 'title2', id: '2' }
]
const mockPosts2 = [
  { author: 'author3', title: 'title3', id: '3' },
  { author: 'author4', title: 'title4', id: '4' }
]
const mockSerizedDataGenerator = (timeStamp, fakePost) => {
  //                              ^^^^^^^^^
  // this method transform api data into the form consumed
  // by the application.
  //
  // We build a generator instead of using the api serializer
  // in the application b/c we want to have have control
  // of the timeStamp.
  return {
    posts: fakePost,
    receivedAt: timeStamp
  }
}



describe('[Fetching Subreddit App]', () => {
  // --------------------
  // setup and tear down
  // --------------------
  beforeEach(()=>{
    const sleepTime = 100

    spyApiGetPosts
    .mockImplementationOnce( async()=>{
      await new Promise((rs)=>{ setTimeout(rs, sleepTime) })   // simulate delay
      return mockSerizedDataGenerator(Date.now(), mockPosts1 ) // 1st call, api return mockPosts1
    })
    .mockImplementationOnce( async()=>{
      await new Promise((rs)=>{ setTimeout(rs, sleepTime) })  // simulate delay
      return mockSerizedDataGenerator(Date.now(), mockPosts2) // 2nd call, api return mockPosts2
    })
  })

  afterEach(()=>{
    spyApiGetPosts.mockReset()  // reset spy
  })


  // --------------
  //  test start
  // --------------

  it('Module mock api with spy works: ', async () => {
    const payload_subreaddit1 = await api.getPosts()
    const payload_subreaddit2 = await api.getPosts()

    const t1 = payload_subreaddit1.receivedAt
    const t2 = payload_subreaddit2.receivedAt
    expect(t1).not.toBe(t2) // t1 and t2 is different b/c api is called at different time

    expect(payload_subreaddit1.posts).toEqual(mockPosts1)
    expect(payload_subreaddit2.posts).toEqual(mockPosts2)
  })


  it('During initial loading there should be no subreddit', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      () => {
        // When the text "loading" is present there should be no subredit

        getByText(/loading/i)

        // dynamically generate RegEx from mockPost
        expect( queryByText(new RegExp(mockPosts1[0].author, 'i')) ).toBeNull()
        expect( queryByText(new RegExp(mockPosts1[0].title, 'i')) ).toBeNull()

        expect( queryByText(new RegExp(mockPosts1[1].author, 'i')) ).toBeNull()
        expect( queryByText(new RegExp(mockPosts1[1].title, 'i')) ).toBeNull()
      }
    )
  })


  it('When subreddit post is showing there should be no loading message', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      () => {
        // When there are subredit the text "loading" should not be present

        getByText(new RegExp(mockPosts1[0].author, 'i'))
        getByText(new RegExp(mockPosts1[0].title, 'i'))

        getByText(new RegExp(mockPosts1[1].author, 'i'))
        getByText(new RegExp(mockPosts1[1].title, 'i'))

        expect(queryByText(/loading/i)).toBeNull()
      }
    )
  })


  it('Refresh button should be disable during loading', async () => {
    const {
      getByText,
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      () => {
        getByText(/loading/i)
        const refreshButton = getByText(/refresh/i)
        expect(refreshButton).toBeDisabled() // <-- toBeDisbled is a feature of jest dom
                                             // https://testing-library.com/docs/ecosystem-jest-dom
      }
    )
  })


  it('Refresh button should be enable after loading', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      () => {
        expect(queryByText(/loading/i)).toBeNull()
        const refreshButton = getByText(/refresh/i)
        expect(refreshButton).toBeEnabled()
      }
    )
  })


  it('Click refresh button will disable refresh button', async () => {
    // This test is possible b/c we have simulated delay for api return.

    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      () => {
        expect(queryByText(/loading/i)).toBeNull()
        const refreshButton = getByText(/refresh/i)
        fireEvent.click(refreshButton)
        expect(refreshButton).toBeDisabled()
      }
    )
  })


  it('Time stamp will be different after refresh', async () => {
    const {
      getByText,
      getByTestId,
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      async () => {
        const lastUpdate_beforeRefresh = getByTestId('last-update')
        const date_beforeRefresh = lastUpdate_beforeRefresh.innerHTML

        const refreshButton = getByText(/refresh/i)
        fireEvent.click(refreshButton)

        // The test is running faster than the application,
        // so we have to pause a moment here with delay
        // before we can read the DOM for date change.
        await new Promise((rs)=>setTimeout(rs, 500))

        const lastUpdate_afterRefresh = getByTestId('last-update')
        const date_afterRefresh = lastUpdate_afterRefresh.innerHTML

        expect(date_beforeRefresh).not.toBe(date_afterRefresh)
      }
    )
  })

  it('Subredit can be different after refresh', async () => {
    const {
      getByText,
      queryByText,
    } = renderWithStore(<ConnectedApp/>)

    await wait(
      async () => {
        getByText( new RegExp(mockPosts1[0].title, 'i') )
        expect(queryByText( new RegExp(mockPosts2[0].title, 'i') )).toBeNull()

        const refreshButton = getByText(/refresh/i)
        fireEvent.click(refreshButton)

        await new Promise( (rs)=>setTimeout(rs, 500) )

        getByText( new RegExp(mockPosts2[0].title, 'i') )
        expect(queryByText( new RegExp(mockPosts1[0].title, 'i') )).toBeNull()
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
