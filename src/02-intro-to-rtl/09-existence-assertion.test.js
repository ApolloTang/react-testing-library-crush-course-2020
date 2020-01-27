import React from 'react'
import {render} from '@testing-library/react'


const MyList = () => (
  <ul>
    <li>React</li>
    <li>Redux</li>
  </ul>
)


describe(`
  ** A demo to show you to how to assert
  ** something existence or non existence
  ** in DOM.`, ()=>{
  let getByText, queryByText, debug

  beforeEach(()=>{
    ({getByText, queryByText, debug} = render(<MyList/>))
  })

  describe('[Existence]', ()=>{
    it('Example of asserting text exist', ()=>{
      expect(getByText('React')).toBeTruthy()
    })

    it( 'getByText get you the HTMLElement', ()=>{
      const whatIsGetByText = getByText('React')

      const returnType_getByText = Object.prototype.toString.call(whatIsGetByText)
      expect(returnType_getByText).toBe('[object HTMLLIElement]')

      debug(whatIsGetByText)
      /*
        <li>
          React
        </li>
      */
    })

    it(
      `[Short cut]
        There is no need to use "expect(....).toBeTruthy()"
        to assert existence
      `, ()=>{
      getByText('React')

      // Because the above return the found node and does not throw
    })
  })

  describe('[Non-existence]', ()=>{
    // assert that the text "Angular" does not exist in the component

    it('Non existence will throw when using "getBy*"', ()=>{
      // This is one way you could assert non-existence
      // but ackward.
      expect(()=>{
        getByText('Angular')
      }).toThrow()
    })

    it('This is how you assert non-existing text', ()=>{
      expect( queryByText('Angular') ).toBeFalsy()
    })


    it(
      `[Gotcha!]
        must use "expect( queryBy*(needInHaystack) ).toBeFalsy()"
        with "queryBy*" to assert non-existing
      `, ()=>{

      const whatIsQueryByText =  queryByText('Angular')
      // Above does not throw and give false positive
      // it return null:
      expect(whatIsQueryByText).toBe(null)

    /*
     Here is a summry for the differences between
     "getBy*" and "queryBy*":

                 │ No Match  │ 1 Match   │ 1+ Match
     ────────────┼───────────┼───────────┼───────────
        getBy    │ throw     │ return    │ throw
        queryBy  │ null      │ return    │ throw
     ────────────┼───────────┼───────────┼───────────
     */
    })
  })
})








