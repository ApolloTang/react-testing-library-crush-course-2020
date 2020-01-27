import { render } from '@testing-library/react'
import React from 'react'


const MyComponent = () => (
  <div>I am a react component</div>
)


test('RTL can render using ReactDOM', () => {
  // *****************************************
  //
  // RTL handle rendering layer
  // no need to deal with ReactDOM
  //
     const { container } = render(<MyComponent/>)
  //
  // *****************************************

  expect(container.innerHTML).toBe('<div>I am a react component</div>')
})
