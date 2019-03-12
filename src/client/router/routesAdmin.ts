import * as React from 'react'
import { asyncComponent } from 'react-async-component'

const routes = [
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