import * as React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import * as stores from './stores'
import { AppStore } from './stores/appStore'
import App from './router'
import './assets/stylus/index.styl'

const appStore = new AppStore(window.ServerData)
const renderApp = (component: typeof App) =>
  hydrate(
    <Provider {...stores} appStore={appStore}>
      <Router>
        <App />
      </Router>
    </Provider>
    ,
    document.getElementById('app')
  )
renderApp(App)