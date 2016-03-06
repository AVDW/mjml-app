import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory, match } from 'react-router'
import { trigger } from 'redial'

import init from './init'
import routes from './routes'
import configureStore from './store/configureStore'

import './styles/main.scss'

const store = configureStore()

init(store).then(() => {

  const onListen = location => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {

      const { components, params, location: { path } } = renderProps
      const { dispatch } = store

      trigger('fetch', components, { params, path, dispatch })
        .then(() => {
          render(
            <Provider store={store}>
              <Router history={hashHistory}>
                {routes}
              </Router>
            </Provider>,
            document.getElementById('root')
          )
        })
    })
  }

  hashHistory.listen(onListen)

})
