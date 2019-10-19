import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Dashout from '../src'
import Page from '../src/models/Page'
import Root from '../src/models/Root'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { initializeIcons } from '@uifabric/icons'
initializeIcons()

export type W = (typeof window) & {
  Page: any
  root: any
}
;(window as W).Page = Page

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

var Home: Page
var key = 0
const onAddPageToRoot = () => {
  key++
  new Page({
    key: 'SubHome ' + key,
    title: 'Sub Home ' + key,
    path: '/subHome ' + key,
    component: (props: any) => <TestComp title="Sub page of Home" {...props} />,
  })
}
const onAddPageToHome = () => {
  key++
  new Page({
    key: 'SubHome ' + key,
    title: 'Sub Home ' + key,
    path: 'subHome ' + key,
    component: (props: any) => <TestComp title="Sub page of Home" {...props} />,
    parent: Home,
  })
}

const onLayoutReady = (root: Root) => {
  // (window as W).root = root;

  Home = new Page({
    key: 'Home',
    title: 'Home',
    path: '/home',
    exact: true,
    component: (props: any) => <TestComp title="Home Page" {...props} />,
    navigationOptions: {
      icon: <Icon iconName="Home" />,
    },
    headerOptions: {
      controls: [
        <Button onClick={onAddPageToHome}>Add New Page to Home</Button>,
        <Button onClick={onAddPageToRoot}>Add New Page to Root</Button>,
      ],
    },
  })
  ;(window as W).root = Home

  var DashBoardPage = new Page({
    key: 'Dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    exact: true,
    navigationOptions: {
      icon: <Icon iconName="ViewDashboard" />,
    },
    component: () => <></>,
    headerOptions: { visible: false },
  })
  new Page({
    key: 'Overview',
    title: 'Overview',
    path: '',
    exact: true,
    navigationOptions: {
      icon: <Icon iconName="CaretRight" />,
      childPaddingMultiplier: 20
    },
    component: (props: any) => <TestComp title="overview" {...props} />,
    parent: DashBoardPage,
  })
  new Page({
    key: 'Task100',
    title: 'Talks 1000',
    path: '/task-1000',
    navigationOptions: {
      icon: <Icon iconName="CaretRight" />,
      childPaddingMultiplier: 20
    },
    component: (props: any) => <TestComp title="Random task" {...props} />,
    parent: DashBoardPage,
  })
  new Page({
    key: 'Talks2',
    title: 'Talks 2',
    path: '/task-2',
    navigationOptions: {
      icon: <Icon iconName="Tablet" />
    },
    component: TestComp,
  })
  new Page({
    key: 'taskHidden',
    title: 'Should not visible',
    path: '/hidden',
    navigationOptions: { visible: false, icon: <Icon iconName="Tablet" /> },
  })
  new Page({
    key: 'Talks4',
    title: 'Should visible',
    path: '/show',
    navigationOptions: { visible: true, icon: <Icon iconName="Tablet" /> },
  })
  new Page({
    key: 'Task 7',
    title: 'Task 7',
    path: '/task 7',
    navigationOptions: { visible: true, icon: <Icon iconName="Tablet" /> },
  })
}

const WrapComponent = () => {
  return <Dashout onReady={onLayoutReady} />
}

storiesOf('react-dashout', module).add('Default', () => <WrapComponent />)
