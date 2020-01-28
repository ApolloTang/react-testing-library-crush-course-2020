import { reducer, initialState } from '../reducer'
import { actions } from '../action'
import { exampleData_payloadSubredit } from '../model'

describe('[Subreddit reducer]', ()=>{
  it('Should return the initail state', ()=>{
    const nonTodosAction = {}
    expect(reducer(undefined, nonTodosAction)).toEqual(initialState)
  })

  it('can set loading state when fetch subreddit start', ()=>{
    const prevState = {
      posts     : [],
      receivedAt: undefined,
      isLoading : false,
      errorMsg  : undefined
    }

    const expectedNextState = {
      posts     : [],
      receivedAt: undefined,
      isLoading : true,
      errorMsg  : undefined
    }

    expect(
      reducer(
        prevState,
        actions.fetchSubreddit_start()
      )
    ).toEqual(expectedNextState)
  })


  it('can handle success state when fetch subreddit success', ()=>{
    const prevState = {
      posts     : [],
      receivedAt: undefined,
      isLoading : false,
      errorMsg  : undefined
    }

    const expectedNextState = {
      posts     : [ ...exampleData_payloadSubredit.posts ],
      receivedAt: exampleData_payloadSubredit.receivedAt,
      isLoading : false,
      errorMsg  : undefined
    }

    expect(
      reducer(
        prevState,
        actions.fetchSubreddit_success(exampleData_payloadSubredit)
      )
    ).toEqual(expectedNextState)
  })

  it('can handle error state when fetch subreddit fail', ()=>{
    const prevState = {
      posts     : [],
      receivedAt: undefined,
      isLoading : false,
      errorMsg  : undefined
    }

    const mockErrorMsg = 'mockErrorMsg'

    const expectedNextState = {
      posts     : [],
      receivedAt: undefined,
      isLoading : false,
      errorMsg  : mockErrorMsg
    }

    expect(
      reducer(
        prevState,
        actions.fetchSubreddit_fail(mockErrorMsg)
      )
    ).toEqual(expectedNextState)
  })
})




