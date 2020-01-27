import React from 'react'
import {
  render, fireEvent
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {Form_subscription} from './form-subscription-v1'
// import {Form_subscription} from './form-subscription-v2'

const api = {
  subscription: jest.fn(()=>new Promise( rs => setTimeout( ()=>{rs('foo')}, 1000) ))
}

describe('[Form: subscription]',()=>{
  test('[name field]', ()=>{
    const regexToMatch = /name/i
    const {
      getByLabelText
    } = render(<Form_subscription api={api}/>)
      getByLabelText(regexToMatch)
      expect(getByLabelText(regexToMatch).type).toBe('text')
      expect(getByLabelText(regexToMatch).disabled).toBeFalsy()
      const input = getByLabelText(regexToMatch)
      const textToType = 'foo'
      userEvent.type(input, textToType)
      expect(input.value).toBe(textToType)
  })

  test('[email field]', ()=>{
    const regexToMatch = /email/i
    const {
      getByLabelText
    } = render(<Form_subscription api={api}/>)
      getByLabelText(regexToMatch)
      expect(getByLabelText(regexToMatch).type).toBe('email')
      expect(getByLabelText(regexToMatch).disabled).toBeFalsy()
      const input = getByLabelText(regexToMatch)
      const textToType = 'foo'
      userEvent.type(input, textToType)
      expect(input.value).toBe(textToType)
  })

  it('can submit name and email', async ()=>{
    const {
      getByLabelText,
      getByTestId,
      findByTestId,
      queryByTestId
    } = render(<Form_subscription api={api}/>)

    const subscriptionForm = getByTestId('subscription-form')
    const input_name = getByLabelText(/name/i)
    const input_email = getByLabelText(/email/i)

    userEvent.type(input_name, 'apollo')
    userEvent.type(input_email, 'apollo@gmail.com')
    fireEvent.submit(subscriptionForm)
    expect(api.subscription).toHaveBeenCalledWith({'email': 'apollo@gmail.com', 'name': 'apollo'})
    await findByTestId('is-posting')
    await findByTestId('message')
    expect(queryByTestId('is-posting')).toBeNull()
  })
})
