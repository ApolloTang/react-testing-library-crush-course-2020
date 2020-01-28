import { ThunkDispatch } from 'redux-thunk'
import { T_appState } from './store'

import {
  asyncActions,
  T_actions_fetchSubreddit,
} from './action'



const getIsoStringFromDatestamp = (receivedAt:number|undefined) =>
  (typeof receivedAt === 'number')
    ? (new Date(receivedAt)).toISOString() : undefined



const mapAppStateToProps = (appState:T_appState) => {
  const receivedAt = appState && appState.receivedAt
  const date = getIsoStringFromDatestamp(receivedAt)

  return {
    date,
    posts: appState && appState.posts || [],
    isLoading: appState && appState.isLoading || false,
    errorMsg: appState && appState.errorMsg
  }
}


// ****************************************************************************************
//
// The only two documentations I can find about typing thunk are:
//   https://medium.com/@peatiscoding/typescripts-with-redux-redux-thunk-recipe-fcce4ffca405
//   https://github.com/reduxjs/redux-thunk/blob/master/src/index.d.ts
//
// ****************************************************************************************
const mapDispatchToProps = (dispatch:ThunkDispatch<T_appState, {}, T_actions_fetchSubreddit>) => ({
  dispatch_fetchSubredditPosts() { dispatch( asyncActions.thunk_fetchSubreddit() ) }
})


type T_mapDispatchToProps = ReturnType<typeof mapDispatchToProps>
type T_mapAppStateToProps = ReturnType<typeof mapAppStateToProps>

export {
  mapAppStateToProps,
  mapDispatchToProps,

  T_mapDispatchToProps,
  T_mapAppStateToProps,

  getIsoStringFromDatestamp
}
