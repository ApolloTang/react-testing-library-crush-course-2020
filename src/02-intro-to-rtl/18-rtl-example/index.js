import React from 'react'
import ReactDOM from 'react-dom'

const container = document.createElement('div')
container.id = 'app'
document.body.appendChild(container)

// =====================================

import {api} from './api'
import {Form_subscription as App} from './form-subscription-v1'
// import {Form_subscription as App} from './form-subscription-v2-refactored'


// =====================================
ReactDOM.render(
  <App api={api}/>,
  document.getElementById('app')
)

