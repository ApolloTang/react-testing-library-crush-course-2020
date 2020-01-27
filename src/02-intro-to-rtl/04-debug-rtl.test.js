import React from 'react'
import {render} from '@testing-library/react'


const MyComponent = () => (
  <div>I am a react component</div>
)


test('can debug in terminal', ()=>{
  const { container, debug } = render(<MyComponent/>)

  // *******************************
  //
  // You can debug in terminal:
  //
      debug(container)
  //
  //     ✓ can debug in terminal (14ms)
  //
  //     console.log node_modules/@testing-library/react/dist/pure.js:94
  //       <div>
  //         <div>
  //           I am a react component
  //         </div>
  //       </div>
  //
  // *******************************

  expect(container.innerHTML).toBe('<div>I am a react component</div>')
})

