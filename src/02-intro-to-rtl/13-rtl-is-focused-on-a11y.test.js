import React from 'react'
import {render} from '@testing-library/react'


const MyForm = () => {
  return (
    <form>
      <label htmlFor="firstname">First name</label>
      <input type="text" id="firstname"/>

      <label htmlFor="lastname">Last name</label>
      <input type="text" id="lastname"/>

      <label htmlFor="midlename">middle name</label>
      <input type="text" id="lastname--error-id-here"/>
    </form>
  )
}

describe('[Using getByLabelText with form]', ()=>{
  let getByLabelText, debug

  beforeEach(()=>{
    ({getByLabelText, debug} = render( <MyForm /> ))
  })

  it('can find first name\'s input by label text', ()=>{
    const input_firstName = getByLabelText(/first name/i)
    debug(input_firstName)
    /*
      <input
        id="firstname"
        type="text"
      />
    */
  })


  it('can find last name\'s input by label text', ()=>{
    const input_lastName = getByLabelText(/last name/i)
    debug(input_lastName)
    /*
      <input
        id="lastname"
        type="text"
      />
    */
  })


  // ** activity **
  // vvvv---remove skip to see error message
  it.skip('can find middle name\'s input by label text', ()=>{ // eslint-disable-line jest/no-disabled-tests
    const input_lastName = getByLabelText(/middle name/i)
    debug(input_lastName)
    /*
      Error Message:
      --------------
        Found a label with the text of: /middle name/i, however no
        form control was found associated to that label. Make sure
        you're using the "for" attribute or "aria-labelledby" attribute correctly.
    */
  })
})

