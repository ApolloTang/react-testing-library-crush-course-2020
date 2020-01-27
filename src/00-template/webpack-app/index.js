import React from 'react'
import ReactDOM from 'react-dom'

const container = document.createElement('div')
container.id = 'app'
document.body.appendChild(container)

// =====================================


import {App} from './app'


// =====================================
ReactDOM.render(
  <App />,
  document.getElementById('app')
)

