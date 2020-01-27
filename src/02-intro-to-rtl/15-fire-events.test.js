import React from 'react'
import {
  render,
  fireEvent
} from '@testing-library/react'

// ********************************************************************************
//
//  you can fire event with:
//
//    fireEvent[eventName]
//
//  more event names at:
//  --------------------
//  https://github.com/testing-library/dom-testing-library/blob/master/src/events.js
//
//  reading (is not long):
//  -----------------------
//  https://testing-library.com/docs/dom-testing-library/api-events
//
//
// ********************************************************************************



const MyCounter = () => {
  const [count, updateCount] = React.useState(0)

  const handle_inc = () => {
    const nextCount = count + 1
    updateCount(nextCount)
  }

  const handle_dec = () => {
    const nextCount = count - 1
    updateCount(nextCount)
  }

  return (
    <div>
      <button onClick={handle_inc}>inc</button>
      <button onClick={handle_dec}>dec</button>
      <div> count: {count} </div>
    </div>
  )
}


describe('[Counter]', ()=>{
  let getByText
  beforeEach(()=>{
    ({getByText} = render( <MyCounter /> ))
  })

  it('can increase counter', ()=>{
    const button_inc = getByText(/inc/i)
    const counter = getByText(/count/i)

    expect(counter).toHaveTextContent('0')
    fireEvent.click(button_inc)
    expect(counter).toHaveTextContent('1')
    fireEvent.click(button_inc)
    expect(counter).toHaveTextContent('2')
  })

  it('can decrease counter', ()=>{
    const button_dec = getByText(/dec/i)
    const counter = getByText(/count/i)

    expect(counter).toHaveTextContent('0')
    fireEvent.click(button_dec)
    expect(counter).toHaveTextContent('-1')
    fireEvent.click(button_dec)
    expect(counter).toHaveTextContent('-2')
  })
})
