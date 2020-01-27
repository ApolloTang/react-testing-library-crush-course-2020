import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// *************************************************
//
//   An example to show how to test form submission
//
// *************************************************

const api = jest.fn()

const MyForm = () => {
  const handle_submit = e => {
    e.preventDefault()
    const target = e.target
    const payload = target.elements.username.value
    api( payload )
  }

  return (
    <form data-testid="my-form" onSubmit={handle_submit} >
      <label htmlFor="username">username</label>
      <input type="text" id="username"/>

      <button>Send</button>
    </form>
  )
}


test('can submit form', ()=>{
  const {
    getByLabelText,
    getByTestId
  } = render(<MyForm/>)

  const myForm = getByTestId('my-form')

  const input_username = getByLabelText(/username/i)
  userEvent.type(input_username, 'apollo')

  fireEvent.submit(myForm)

  expect(api).toHaveBeenCalledWith('apollo')
})


