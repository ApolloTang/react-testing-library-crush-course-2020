import React, { useEffect } from 'react'
import {connect} from 'react-redux'

import { T_post } from './model'
import {
  mapAppStateToProps, mapDispatchToProps,
  T_mapAppStateToProps, T_mapDispatchToProps
} from './selector'

type T_Post_props = {post:T_post}
type T_LastUpdateDate_props = {date:string}
type T_App_props = T_mapAppStateToProps & T_mapDispatchToProps



const Post = ({post}:T_Post_props) => (<div> {post.author} : {post.title} </div>)


const LastUpdateDate = ({date}:T_LastUpdateDate_props)=> (
  <div>
    <span>last updated at: </span><span data-testid="last-update">{date}</span>
  </div>
)



const App = ({
  date, posts, isLoading, errorMsg, dispatch_fetchSubredditPosts
}:T_App_props) => {
  const handle_refresh = () => {
    if (!isLoading) { dispatch_fetchSubredditPosts() }
  }

  useEffect(()=>{
    if (!isLoading) { dispatch_fetchSubredditPosts() }
    return () => { }
  }, [/* onMount and onUnmount] */])

    return(
      <div>
        <div>fetching list of posts from https://www.reddit.com/r/reactjs/</div>
        <div>
          <button onClick={handle_refresh} disabled={isLoading} >refresh</button>
          <span>{ isLoading ? '... Loading': '' }</span>
        </div>
        { date ? <LastUpdateDate date={date}/> : null }
        <div>
          {
            Array.isArray(posts)
            ? posts.map( post => <Post key={post.id} post={post} /> )
            : null
          }
        </div>
        { errorMsg ? <div data-testid="error-msg">{errorMsg}</div> : null }
      </div>
    )

}


const ConnectedApp = connect(mapAppStateToProps, mapDispatchToProps)(App)
export {ConnectedApp}




