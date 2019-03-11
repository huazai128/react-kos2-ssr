import * as React from 'react'
import { asyncComponent } from 'react-async-component'
import { RouteConfig } from 'react-router-config'

const routes: RouteConfig[] = [
  {
    path: '/admin/',
    exact: true,
    component: asyncComponent({
      resolve: () => import('../containers/admin/Home'),
    }),
    name: '首页'
  },
  {
    path: '/admin/login',
    exact: true,
    component: asyncComponent({
      resolve: () => import('../containers/admin/Login'),
    }),
  },
]

export default routes;