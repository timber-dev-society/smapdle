import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Provider } from 'react-redux'

import store from './store'
import App from './components/app'
import reportWebVitals, { sendToAnalytics } from './reportWebVitals'

const GlobalStyle = createGlobalStyle`
  ${reset}
  font-size: 14px;
`

render(
  <StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToAnalytics)
