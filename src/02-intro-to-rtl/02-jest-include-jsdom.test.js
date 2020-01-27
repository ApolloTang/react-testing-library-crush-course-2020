import React from 'react'
import ReactDOM from 'react-dom'


const MyComponent = () => (
  <div>I am a react component</div>
)


test('jest can render into jsdom', ()=>{
  // *****************************************
  //
  // window.document already created for you
  // no need to worry about set up jsdom
  //
     const div = document.createElement('div')
  //
  // *****************************************


  ReactDOM.render(<MyComponent/>, div)
  expect(div.innerHTML).toBe('<div>I am a react component</div>')
})
