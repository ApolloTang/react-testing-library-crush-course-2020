import fetchMock from 'fetch-mock' // eslint-disable-line
import {
  exampleData_apiSubreddit,  // eslint-disable-line
  apiSerializer_subreddit
} from './model'


// ==========
// Uncomment out one of next 2 lines to simulate mock fetching:
  // fetchMock.get('https://www.reddit.com/r/reactjs.json', exampleData_apiSubreddit)
  // fetchMock.get('https://www.reddit.com/r/reactjs.json', 500)
// ==========

const getPosts = async() => {
  const response = await fetch('https://www.reddit.com/r/reactjs.json')

  // Uncomment out next line to simulate latency
  // await new Promise(rs=>{setTimeout(rs, 1000)})

  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }

  const subredditInJson = await response.json()
  const data_serialized = apiSerializer_subreddit(subredditInJson)

  return data_serialized
}


const api = {
  getPosts
  // Can have other end point in the future like:
  //
  //   createPosts
  //   deletePosts
  //   updatePosts
  //
}



export {
  api
}
