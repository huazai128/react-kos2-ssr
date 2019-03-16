import * as React from 'react'
import { asyncComponent } from 'react-async-component'

const routes = [
  {
    path: '/admin/',
    exact: true,
    component: asyncComponent({
      resolve: () => import('../containers/admin/Home'),
    }),
    name: '首页',
    isNav: true
  },
  {
    path: '/admin/tags',
    exact: true,
    component: asyncComponent({
      resolve: () => import('../containers/admin/Tag'),
    }),
    name: '标签',
    isNav: true
  },
  {
    path: '/admin/post-article',
    exact: true,
    component: asyncComponent({
      resolve: () => import('../containers/admin/PostArticle'),
    }),
    name: '新增文章',
    isNav: false
  },
  {
    path: '/admin/login',
    exact: true,
    component: asyncComponent({
      resolve: () => import('../containers/admin/Login'),
    }),
    isNav: false
  },
]

export default routes;