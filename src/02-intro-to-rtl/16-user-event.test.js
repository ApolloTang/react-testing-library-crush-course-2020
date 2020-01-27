import React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'



// **************************************************
//
//  Use user-event helper library for simulating
//  user event:
//
//    https://github.com/testing-library/user-event
//
// **************************************************



const MyForm = () => {
  const handle_onInputChange_name = ({target}) => { // eslint-disable-line
    // console.log(target.value)  // <------- uncomment this to see typing in action
  }
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input onChange={handle_onInputChange_name} type="text" id="name"/>
    </form>
  )
}


test('event can type into form', ()=>{ // eslint-disable-line
  const {
    getByLabelText,
  } = render(<MyForm/>)

  const input_name = getByLabelText(/name/i)

  userEvent.type(input_name, 'apollo tang')
})


