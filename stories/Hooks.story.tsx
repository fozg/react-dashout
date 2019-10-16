import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Dashout, { Page } from '../src'

const Button = styled.div`
  background-color: #eee;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  :hover {
    background-color: #ddd;
  }
`

function TestComp({ title, ...props }: { title?: string; page: Page }) {
  return (
    <div>
      <code>
        This is <b>{title}</b>
      </code>
      <br />
      <code>and path is: {props.page.getPath()}</code>
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
    headerOptions: {
      controls: [<Button>Add Product</Button>, <Button>Add Order</Button>],
    },
  })
  var DashBoardPage = new Page({
    key: 'Dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    exact: true,
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
