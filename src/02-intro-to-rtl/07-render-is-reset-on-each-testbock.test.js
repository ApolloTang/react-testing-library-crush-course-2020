import React from 'react'
import {render} from '@testing-library/react'


const MyComponent = () => (
  <div>I am a react component</div>
)

describe('[jsdom is reset for each test block]', ()=>{

  describe('demo to show jsdom is reset for each test block', ()=>{
    const { container, debug } = render(<MyComponent/>)

    it('first test block', ()=>{
      expect(container).toContainHTML('<div>I am a react component</div>')
      debug(container)
      // ***************************************************************
      //
      // console.log node_modules/@testing-library/react/dist/pure.js:94
      // <div>
      //   <div>
      //     I am a react component
      //   </div>
      // </div>
      //
      // ***************************************************************
    })

    it('second test block: jsdome is reset', ()=>{
      expect(container).not.toContainHTML('<div>I am a react component</div>')
      expect(container).toContainHTML('')
      debug(container)
      // ***************************************************************
      //
      // jsdom has been reset, we can no longer see our component:
      //
      //
      // console.log node_modules/@testing-library/react/dist/pure.js:94
      //   <div />
      //
      // ***************************************************************
    })
  })




  describe('demo to show the need to render before each test block', ()=>{
    let debug, container

    beforeEach(()=>{
      //   *********************************************
      //
      //   here we render our component before each test
      //   so that we still have our component on each
      //   test block
      //
      //   *********************************************
      ({debug, container} = render(<MyComponent/>))
    })

    it('first test block', ()=>{
      expect(container).toContainHTML('<div>I am a react component</div>')
      debug(container)
      // ***************************************************************
      //
      // console.log node_modules/@testing-library/react/dist/pure.js:94
      // <div>
      //   <div>
      //     I am a react component
      //   </div>
      // </div>
      //
      // ***************************************************************
    })

    it('second test block: we rendered before each', ()=>{
      expect(container).toContainHTML('<div>I am a react component</div>')
      debug(container)
      // ***************************************************************
      //
      // console.log node_modules/@testing-library/react/dist/pure.js:94
      // <div>
      //   <div>
      //     I am a react component
      //   </div>
      // </div>
      //
      // ***************************************************************
    })
  })
})
