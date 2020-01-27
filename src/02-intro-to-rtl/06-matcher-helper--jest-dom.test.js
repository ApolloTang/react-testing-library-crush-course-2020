import React from 'react'
import {render} from '@testing-library/react'

// ***************************************************
//
//  https://github.com/testing-library/jest-dom
//
//  'jest-dom' is an add on,
//  it is like jest matcher that specialized in
//  helping you match DOM object.
//
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




test('Needle in heystack', ()=>{
  const { container } = render(<MyComponent/>)

  const needle = container.querySelector('.needle')
  expect(needle).toHaveTextContent('needle')
  expect(needle).toContainHTML('<b>needle</b>')
  expect(needle).toHaveClass('needle')
  expect(needle).toHaveStyle('color:red')
})

