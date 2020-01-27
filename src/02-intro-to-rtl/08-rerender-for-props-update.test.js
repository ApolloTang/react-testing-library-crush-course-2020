import React from 'react'
import {render} from '@testing-library/react'


// ******************************
//
//  if the property of the
//  component change we
//  have to rerender
//
// ******************************,


const MyComponent = ({x}) => (
  <div>x: {x}</div>
)



test('[Rerender for props update]', ()=>{
  const {
    container,
    rerender   // <--------- we use this to rerender
  } = render(<MyComponent x="0" />)

  expect(container).toHaveTextContent('0')

  ;[1,2,3].forEach( x=>{
    expect(container).not.toHaveTextContent(x+'')
    //               ^^^^^
  })

  ;[1,2,3].forEach( x=>{
    rerender(<MyComponent x={x} />) // <----- rerender with new props
    expect(container).toHaveTextContent(x+'')
  })
})





