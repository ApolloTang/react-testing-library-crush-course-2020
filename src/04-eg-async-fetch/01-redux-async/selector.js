import {
  asyncActions,
} from './action'



const getIsoStringFromDatestamp = receivedAt =>
  (typeof receivedAt === 'number')
    ? (new Date(receivedAt)).toISOString() : undefined



const mapStoreToProps = store => {
  const receivedAt = store && store.receivedAt
  const date = getIsoStringFromDatestamp(receivedAt)

  return {
    date,
    posts: store && store.posts || [],
    isLoading: store && store.isLoading || false,
    errorMsg: store && store.errorMsg
  }
}



const mapDispatchToProps = dispatch => ({
  dispatch_fetchSubredditPosts() { dispatch( asyncActions.thunk_fetchSubreddit() ) }
})



export {
  mapStoreToProps,
  mapDispatchToProps,

  getIsoStringFromDatestamp
}
