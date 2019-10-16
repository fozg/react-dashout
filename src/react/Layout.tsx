import React, { ReactElement, ComponentType, ElementType } from 'react'
import styled from 'styled-components'
import { Fill, ViewPort, Top, LeftResizable } from 'react-spaces'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Service } from './DashOut'
import Page from '../models/Page'
import DefaultLogo from './default/DefaultLogo'
import Header from './default/Header'

type Props = {
  left?: ReactElement
  logo?: ReactElement
}

const Layout: React.FC<Props> = ({ left, logo = <DefaultLogo /> }) => {
  const site = Service.getRoot()
  const pages = site.usePages()

  return (
    <Router>
      <ViewPortWrap>
        <StyledTop size="40px">{logo}</StyledTop>
        <ViewPort>
          <LeftResizable
            maximumSize={500}
            minimumSize={250}
            size="250px"
            style={{
              borderRight: '1px solid #eee',
              padding: 10,
              background: '#f5f5f5',
            }}
          >
            {left}
          </LeftResizable>
          <Fill style={{ padding: 10 }}>
            {pages.map((page: Page) => (
              <BuildRoute page={page} key={page.key} />
            ))}
          </Fill>
        </ViewPort>
      </ViewPortWrap>
    </Router>
  )
}

const BuildRoute: React.FC<{ page: Page }> = ({ page }) => (
  <Switch>
    {[
      <Route
        path={page.getPath()}
        component={(props: object) => withPage(props)(page.component, page)}
        exact={page.exact}
      />,
      page.children
        .getState('pages')
        .map((child: Page) => <BuildRoute page={child} key={child.key} />),
    ]}
  </Switch>
)

function withPage(props: object) {
  return function(
    Component: React.FC<{ page: Page }> | ComponentType | ElementType,
    page: Page,
  ) {
    return (
      <>
        {page.headerOptions.visible && <Header page={page} />}
        <Component {...props} page={page} />
      </>
    )
  }
}

export default Layout

const StyledTop = styled(Top)`
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ViewPortWrap = styled(ViewPort)`
  background-color: #fff;
`
