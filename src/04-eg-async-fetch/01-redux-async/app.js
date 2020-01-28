import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { 
  mapStoreToProps, mapDispatchToProps 
} from './selector'



const Post = ({post}) => (<div> {post.author} : {post.title} </div>)


const LastUpdateDate = ({date})=> (
  <div>
    <span>last updated at: </span><span data-testid="last-update">{date}</span>
  </div>
)



const App = ({
  date, posts, isLoading, errorMsg, dispatch_fetchSubredditPosts
}) => {
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


const ConnectedApp = connect(mapStoreToProps, mapDispatchToProps)(App)
export {ConnectedApp}




