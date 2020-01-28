import { 
  actionNames, 
  T_actions 
} from './action'
import { T_posts } from './model'


interface T_reducer {
  posts     : T_posts
  receivedAt: undefined|number
  isLoading : boolean
  errorMsg  : undefined|string
}



const initialState:T_reducer = {
  posts     : [],
  receivedAt: undefined,
  isLoading : false,
  errorMsg  : undefined
}


function reducer( state=initialState, action:T_actions): T_reducer {
  switch (action.type) {
    case actionNames.fetchSubreddit_start: {
      type T_start = typeof action
      return {
        ...state,
        isLoading: true,
        errorMsg: undefined
      }
    }
    case actionNames.fetchSubreddit_success: {
      type T_success = typeof action
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
      type T_fail = typeof action
      const error = action && action.error
      return {
        ...state,
        isLoading: false,
        errorMsg: error
      }
    }
    default:
      type T_catchAll = typeof action
      return state
  }
}

export {
  initialState,
  reducer
}
