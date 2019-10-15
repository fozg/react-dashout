# React-DashOut
React Dashboard Layout

---

[**Demo**](https://fozg.github.io/react-dashout/?path=/story/react-dashout--default)

### Install
```bash
npm i react-dashout
#or 
yarn add react-dashout
```

### Usage 
```js
import Dashout, {Page} from 'react-dashout';

function OnReady() {
  new Page({
    path: '/',
    title: 'Home',
    key: 'Home'
  });
  
  var Dashboard = new Page({
    path: '/dashboard',
    title: 'Dashboard',
    key: 'Dashboard'
  })
  // add sub page to dashboard
  var Sale = new Page({
    path: '/sales',
    title: 'Sales',
    key: 'dashboard-sale',
    parent: Dashboard
  })
  // add sub page but not visibility on Navigation Bar
  new Page({
    path: '/add',
    title: 'Add Sales Detail',
    key: 'dashboard-sale-add',
    parent: Sale,
    navigationOptions: {
      visible: false
    }
  })
}

function App() {
  return (
    <Dashout 
      onReady={onReady}
      logo={<Tbd />}
      {...toBeDefineNextVersion}
    />
  )
}
```