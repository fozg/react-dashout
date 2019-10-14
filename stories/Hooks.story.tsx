import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Layout, { Page } from '../src'

const onLayoutReady = () => {
  new Page({
    key: 'Home',
    title: 'Home',
    path: '/',
    exact: true,
    // component: () => <Task1 />
  }).addToSite()

  var DashBoardPage = new Page({
    key: 'Dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    component: () => <h1>Dashboard</h1>,
    children: [
      new Page({
        key: 'Talks1',
        title: 'Talks 1',
        path: '/task-1',
        component: () => <h1>Task 1</h1>,
      }),
      new Page({ key: 'Talks2', title: 'Talks 2', path: '/task-2' }),
      new Page({ key: 'Talks3', title: 'Talks 3', path: '/task-3' }),
      new Page({
        key: 'Talks5',
        title: 'Talks 5',
        path: '/task-5',
        children: [
          new Page({
            key: 'TalksSub1',
            title: 'What language should I learn in 2020',
            path: '/task-sub-1',
          }),
        ],
      }),
      new Page({ key: 'Talks4', title: 'Talks', path: '/11' }),
    ],
  })
  DashBoardPage.addToSite()
}

const WrapComponent = () => {
  return <Layout onReady={onLayoutReady} />
}

storiesOf('react-dashout', module).add('Default', () => <WrapComponent />)
