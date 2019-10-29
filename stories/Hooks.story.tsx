import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { Redirect } from 'react-router-dom'
import Dashout from '../src'
import Page from '../src/models/Page'
import Root from '../src/models/Root'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { initializeIcons } from '@uifabric/icons'
import Listing from './components/List'
import Detail from './components/Detail'

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
const Card = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
`

function TestComp({ title, ...props }: { title?: string; page: Page }) {
  return (
    <Card>
      <code>
        This is <b>{title}</b>
      </code>
      <br />
      <code>and path is: {props.page.getPath()}</code>
      <div></div>
      <pre>testing...</pre>
    </Card>
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
    contentOptions: {
      maxWidth: 1000,
    },
    component: () => <Redirect to="/dashboard/a" />,
    headerOptions: { visible: false },
  })
  var analytics = new Page({
    key: 'Analytics',
    title: 'Analytics',
    path: '/a',
    contentOptions: {
      maxWidth: 1000,
      layout: 'MasterLayout',
    },
    navigationOptions: {
      icon: <Icon iconName="AnalyticsView" />,
    },
    headerOptions: {
      // masterLayoutComponent: () => <h3>Hello world</h3>,
    },
    component: Listing,
    parent: DashBoardPage,
  })
  new Page({
    key: 'details',
    title: 'Details',
    path: '/:d',
    exact: true,
    contentOptions: {
      // maxWidth: 1000,
      // layout: "MasterLayout"
    },
    navigationOptions: {
      icon: <Icon iconName="AnalyticsView" />,
      visible: false,
    },
    component: Detail,
    parent: analytics,
  })

  new Page({
    key: 'C',
    title: 'Sales',
    path: '/Sales',
    navigationOptions: {
      icon: <Icon iconName="MultiSelectMirrored" />,
    },
    component: (props: any) => <TestComp title="Random task" {...props} />,
    parent: DashBoardPage,
  })
  new Page({
    key: 'Comer',
    title: 'Commerce',
    path: '/test/add',
    navigationOptions: {
      visible: true,
      icon: <Icon iconName="MultiSelectMirrored" />,
    },
    component: (props: any) => <TestComp title="Random task" {...props} />,
    parent: DashBoardPage,
  })

  var Assets = new Page({
    key: 'C1',
    title: 'Assets',
    path: '/assets',
    headerOptions: {
      visible: false,
    },
    component: false,
    navigationOptions: {
      visible: true,
      icon: <Icon iconName="FolderSearch" />,
    },
  })

  new Page({
    key: 'C11',
    title: 'Videos',
    exact: true,
    path: '',
    navigationOptions: { visible: true, icon: <Icon iconName="FileImage" /> },
    parent: Assets,
  })
  new Page({
    key: 'C12',
    title: 'Images',
    path: '/images',
    navigationOptions: { visible: true, icon: <Icon iconName="FileImage" /> },
    parent: Assets,
  })
  new Page({
    key: 'C13',
    title: 'Others',
    path: '/other',
    navigationOptions: {
      visible: true,
      icon: <Icon iconName="FileTemplate" />,
    },
    parent: Assets,
  })

  var Settings = new Page({
    key: 'Setttings',
    title: 'Settings',
    path: '/settings',
    component: false,
    navigationOptions: { visible: true, icon: <Icon iconName="Settings" /> },
  })
  new Page({
    key: 'SubTask7',
    title: 'User Settings',
    path: '',
    exact: true,
    navigationOptions: {
      visible: true,
      icon: <Icon iconName="PlayerSettings" />,
    },
    parent: Settings,
  })
  new Page({
    key: 'ss',
    title: 'System settings',
    path: '/system',
    navigationOptions: {
      visible: true,
      icon: <Icon iconName="System" />,
    },
    parent: Settings,
  })
  // new Page({
  //   key: 'SubTask7-2',
  //   title: 'Sub Task 7 - 2',
  //   path: '/sub2',
  //   navigationOptions: { visible: true, icon: <Icon iconName="CaretRight" />, childPaddingMultiplier: 20 },
  //   parent: task7,
  // })
}

const WrapComponent = () => {
  return (
    <Dashout
      defaultRoute="/dashboard/a"
      logo={<strong style={{ paddingLeft: 10 }}>Dashout Demo</strong>}
      onReady={onLayoutReady}
      config={{
        navigationOptions: { childPaddingMultiplier: 30 },
        contentOptions: { maxWidth: 1200 },
      }}
      topNavStyles={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
        color: '#000',
      }}
    />
  )
}

storiesOf('react-dashout', module).add('Default', () => <WrapComponent />)
