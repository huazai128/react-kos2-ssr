import * as React from 'react'
import { asyncComponent } from 'react-async-component'
import { RouteConfig } from 'react-router-config'
import Loading from '../components/loading'

const routes:RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      resolve: () => import("../containers/client/Home"),
      // LoadingComponent: () => (<Loading />)
    })
  },
  {
    path: '/index',
    exact: true,
    component: asyncComponent({
      resolve: () => import("../containers/client/Home"),
      // LoadingComponent: () => (<Loading />)
    })
  }
]

export default routes;