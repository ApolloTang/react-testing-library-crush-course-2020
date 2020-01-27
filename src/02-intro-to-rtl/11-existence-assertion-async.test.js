import React from 'react'
import {render} from '@testing-library/react'

// **************************************************
//
// sometime we have to wait for thing to
// appear becasue it is async
//
// query that start with "find" using
// dom mutation observer to wait for your stuff
// to appear.
//
// **************************************************

const MyApp = () => {
  const [show, updateShow] = React.useState(false)

  React.useEffect(()=>{
    // after mount we delay 1000ms to show our text
    setTimeout(()=>{ updateShow(true) }, 1000)
  }, [])

  return(
    <>
      { show? 'now you see me': null }
    </>
  )
}


it('[Existence assertion async]', async () => {
  const {
    findByText, // <--- this one is async, it wait for 5000ms by default
    queryByText,
    container, debug
  } = render(<MyApp />)

  expect(queryByText(/now you see me/i)).toBeNull()
  debug(container)
  await findByText(/now you see me/i)
  debug(container)

})








