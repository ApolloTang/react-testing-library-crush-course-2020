import { ThunkAction } from 'redux-thunk'

import { api } from './api'

import {T_subreddit_serialized} from './model'
import {T_appState} from './store'


enum actionNames {
  fetchSubreddit_start = 'fetchSubreddit_start',
  fetchSubreddit_success = 'fetchSubreddit_success',
  fetchSubreddit_fail = 'fetchSubreddit_fail',
}



type T_payload_subreaddit = T_subreddit_serialized
type T_payload_subreddit_error = string

const fetchSubreddit_start = () => ({
  type: actionNames.fetchSubreddit_start as actionNames.fetchSubreddit_start
})
const fetchSubreddit_success = (payload_subreaddit:T_payload_subreaddit) => ({
  type: actionNames.fetchSubreddit_success as actionNames.fetchSubreddit_success,
  payload: payload_subreaddit
})
const fetchSubreddit_fail = (payload_subreddit_error:T_payload_subreddit_error) => ({
  type: actionNames.fetchSubreddit_fail as actionNames.fetchSubreddit_fail,
  error: payload_subreddit_error
})


const actions = {
  fetchSubreddit_start,
  fetchSubreddit_success,
  fetchSubreddit_fail
}


type T_actions_fetchSubreddit =
  ReturnType<typeof fetchSubreddit_start> |
  ReturnType<typeof fetchSubreddit_success> |
  ReturnType<typeof fetchSubreddit_fail>



// ****************************************************************************************
//
// The only two documentations I can find about typing thunk are:
//   https://medium.com/@peatiscoding/typescripts-with-redux-redux-thunk-recipe-fcce4ffca405
//   https://github.com/reduxjs/redux-thunk/blob/master/src/index.d.ts
//
// ****************************************************************************************
const thunk_fetchSubreddit = ():ThunkAction<Promise<void>, T_appState, {}, T_actions_fetchSubreddit> =>
  async (dispatch) => {
    // dispatch (1): flag to application to loading state
    dispatch( actions.fetchSubreddit_start() )

    let payload_subreaddit

    try {
      payload_subreaddit = await api.getPosts()
      // dispatch (2a): we have data!
      dispatch( actions.fetchSubreddit_success(payload_subreaddit) )
    } catch (error) {
      // dispatch (2b): we have error
      dispatch( actions.fetchSubreddit_fail(error.toString()))
    }
}


const asyncActions = { // <--- here we package all our thunks into an object
  thunk_fetchSubreddit,
  // thunk_deleteSubreddit    //<-- can have more thunk in the future
}


type T_actions = T_actions_fetchSubreddit
// In the the above we merge the action-creator of this
// feature (fetch Subreddit) into the application action type


export {
  actionNames,
  asyncActions,
  actions,

  T_actions_fetchSubreddit,
  T_actions,
}
