import {
  actionNames,
} from './action'


const initialState = {
  posts     : [],
  receivedAt: undefined,
  isLoading : false,
  errorMsg  : undefined
}


function reducer( state = initialState, action) {
  switch (action.type) {
    case actionNames.fetchSubreddit_start: {
      return {
        ...state,
        isLoading: true,
        errorMsg: undefined
      }
    }
    case actionNames.fetchSubreddit_success: {
      const payload = action && action.payload && action.payload

      const posts = payload && payload.posts
      const receivedAt = payload && payload.receivedAt
      return {
        ...state,
        posts,
        receivedAt,
        isLoading: false,
        errorMsg: undefined
      }
    }
    case actionNames.fetchSubreddit_fail: {
      const error = action && action.error
      return {
        ...state,
        isLoading: false,
        errorMsg: error
      }
    }
    default:
      return state
  }
}

export {
  initialState,
  reducer
}
