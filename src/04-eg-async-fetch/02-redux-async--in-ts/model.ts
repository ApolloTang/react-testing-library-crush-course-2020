//
// file: model.ts
//
// In this file we transform data from api to data the a shape
// that is consumable by reducer.



// =============================================
//    Example of subreddit data shape from API
// =============================================

  // -------------------
  //  case(1) good data
  // -------------------
    const exampleData_apiSubreddit = {
      data: {
        children: [
          { data: { author: 'author1', title: 'title1', id: '1' } },
          { data: { author: 'author2', title: 'title2', id: '2' } }
          // ...
        ]
      }
    }

  // ----------------------
  //  case(2, 3) bad data
  // ----------------------
    const exampleData_apiSubreddit_bad1 = {}        // eslint-disable-line
    const exampleData_apiSubreddit_bad2 = undefined // eslint-disable-line



// =======================================================
//     Example of subreddit data shape in action payload
//     to be consumed by reducer
// =======================================================

  // ------------------------------------
  //  case(1): transform from good data
  // ------------------------------------
  const exampleData_payloadSubredit = { // eslint-disable-line
    posts: [ // <---  ReadonlyArray
      { author: 'author1', title: 'title1', id: '1' },
      { author: 'author2', title: 'title2', id: '2' }
      // ...
      // ...
    ],
    receivedAt: 1569818341066
  }


  // -------------------------------------
  //  case(2,3): transform from bad data
  // -------------------------------------
  const exampleData_payloadSubredit_empty = { // eslint-disable-line
    posts: [], // ReadonlyArray
    receivedAt: 1569818341066
  }



// ============
//  Api schema
// ============

  type T_post_api = {
    author: string
    title: string
    id: string
  }

  type T_postData_api = {
    data: T_post_api
  }

  type T_subreddit_api =
    { data?: { children: T_postData_api[] } }  // case(1,2): good data, bad1
    | undefined                                // case(3)  : bad2


// ==========================================
//  payload schema to be consumed by reducer
// ==========================================

  type T_post = {
      author: string
      title: string
      id: string
    }
  type T_posts = ReadonlyArray<T_post>

  interface T_subreddit_serialized {
    posts:T_posts
    receivedAt: number
  }


// =============================================================
//   Here we transform (serialize) api data to the shape in
//   payload that is digestable by reducer:
//
//    T_subreddit_api --(transform)--> T_subreddit_serialized
// =============================================================
const apiSerializer_subreddit = (json:T_subreddit_api) => {
  const receivedAt = Date.now()

  let subreddit_serialized:T_subreddit_serialized = { // case(2,3) bad data
    posts:[],
    receivedAt
  }

  if (json && json.data && json.data.children && Array.isArray(json.data.children)) {
    const posts =  json.data.children.map(
      child => {
        const data = child.data
        const post = {
          author: data && data.author,
          title: data && data.title,
          id: data && data.id
        }
        return post
      }
    )

    subreddit_serialized = { // case(1) good data
      posts,
      receivedAt
    }
  }

  return subreddit_serialized
}


export {
  exampleData_apiSubreddit,
  exampleData_payloadSubredit,

  apiSerializer_subreddit,

  T_post,
  T_posts,
  T_subreddit_serialized
}
