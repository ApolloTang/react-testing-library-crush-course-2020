import React from 'react'
import {render} from '@testing-library/react'

// ================================================
//
// Your test should be independent of presentation
//
// ================================================

const CancelButton = () => (
  <button>ABORT NOW</button>
)

test('cancel button exist', ()=>{
  const {getByText} = render(<CancelButton/>)
  expect(getByText(/(cancel|abort)/i)).toBeTruthy()
  // Note:
  // • We don't test for exactness, we test for functionality
  //   business has freedom to choose the text.
  // • We don't check for presentation -- ignore case
})








