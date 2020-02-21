// ****************************************************
//
// To see demo run in terminal the following:
//
//  $ yarn n:w ./src/path/to/this/folder/01-render.js
//
// ****************************************************



import { JSDOM } from 'jsdom'
import jsdomGlobal from 'jsdom-global'
import React from 'react'
import ReactDOM from 'react-dom'

  // Here is the jsdom window
  const { window:jsDomWindow } = new JSDOM(`
    <!DOCTYPE html>
    <div id="react-container">rect component goes here</div>
  `)


const MyComponent = () => (
  <div>I am a react component</div>
)


// Get a reference to the div element for ReactDOM to render
const reactContainer = jsDomWindow.document.getElementById('react-container')
console.log('[0] Text content of reactContainer: ', reactContainer.textContent)


  // React need the the window global object in node
  try {
    console.log('[1] window object in node exist: ', Object.keys(window).length !==0 )
  } catch (e) {
    console.log('[1] window object in node not available')  // <---
  }

  // Add window object to node
  jsdomGlobal()


  try {
    console.log('[2] window object in node exist: ', Object.keys(window).length !==0 ) // true
  } catch (e) {
    console.log('[2] window object in node not available')
  }

ReactDOM.render(<MyComponent />, reactContainer) // Render virtual dom into jsdome

console.log('[3] MyComponent:', reactContainer.innerHTML)


// *************************************
// This is idea of server side rendering
//    OR
// the idea behind React Testing Library
// *************************************

