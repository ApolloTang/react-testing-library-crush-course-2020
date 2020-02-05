import React from 'react'
import {render} from '@testing-library/react'

// ***************************************************
//
//  you can think of the container as window.document
//  and it has all your usual dom methods such as:
//
//    window.document.querySelector
//
// ***************************************************


const MyComponent = () => (
  <div className="my-component">
    <h1> Title </h1>
    <nav>
      <ul>
        <li><a>page 1</a></li>
        <li><a>page 2</a></li>
      </ul>
    </nav>
    <main >
      <p className="heystack" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse <span className="needle" style={{color:'red'}}>
        <b>needle</b></span> cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </main>
    <footer> my foot </footer>
  </div>
)


test('Container is like window.document', ()=>{
  const { container } = render(<MyComponent/>)
  const needle = container.querySelector('.needle')
  expect(needle.innerHTML).toBe('<b>needle</b>')
})

