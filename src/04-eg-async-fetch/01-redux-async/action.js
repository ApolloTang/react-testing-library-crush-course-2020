import { api } from './api'


const actionNames = {
  fetchSubreddit_start: 'fetchSubreddit_start',
  fetchSubreddit_success: 'fetchSubreddit_success',
  fetchSubreddit_fail: 'fetchSubreddit_fail',
}



const fetchSubreddit_start = () => ({
  type: actionNames.fetchSubreddit_start
})
const fetchSubreddit_success = payload_subreaddit => ({
  type: actionNames.fetchSubreddit_success,
  payload: payload_subreaddit
})
const fetchSubreddit_fail = payload_subreddit_error => ({
  type: actionNames.fetchSubreddit_fail,
  error: payload_subreddit_error
})


const actions = {
  fetchSubreddit_start,
  fetchSubreddit_success,
  fetchSubreddit_fail
}

const thunk_fetchSubreddit = () => async dispatch => {
    // dispatch (1): flag to applincation to loading state
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


export {
  actionNames,
  asyncActions,
  actions
}
