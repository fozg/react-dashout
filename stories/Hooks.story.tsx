import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Dashout, { Page } from '../src'

function TestComp({ title, ...props }: { title?: string; page: Page }) {
  console.log(props.page.path)
  return (
    <div>
      <h2>{title}</h2>
      <code>{props.page.getPath()}</code>
    </div>
  )
}

const onLayoutReady = () => {
  new Page({
    key: 'Home',
    title: 'Home',
    path: '/',
    exact: true,
    component: (props: any) => <TestComp title="Home" {...props} />,
  })
  var DashBoardPage = new Page({
    key: 'Dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    component: (props: any) => <TestComp title="Dashboard" {...props} />,
  })
  new Page({
    key: 'Task100',
    title: 'Talks 1000',
    path: '/task-1000',
    component: (props: any) => <TestComp title="Random task" {...props} />,
    parent: DashBoardPage,
  })
  new Page({
    key: 'Talks2',
    title: 'Talks 2',
    path: '/task-2',
    component: TestComp,
  })
  new Page({
    key: 'Talks4',
    title: 'Should not visible',
    path: '/hidden',
    navigationOptions: { visible: false },
  })
  new Page({
    key: 'Talks4',
    title: 'Should visible',
    path: '/show',
    navigationOptions: { visible: true },
  })
}

const WrapComponent = () => {
  return <Dashout onReady={onLayoutReady} />
}

storiesOf('react-dashout', module).add('Default', () => <WrapComponent />)
