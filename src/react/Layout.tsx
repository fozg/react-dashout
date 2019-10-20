import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Fill, ViewPort, Top, LeftResizable } from 'react-spaces'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Service } from './DashOut'
import Page from '../models/Page'
import DefaultLogo from './default/DefaultLogo'
import Header from './default/Header'

type Props = {
  left?: ReactElement
  logo?: ReactElement,
  pages: Array<Page>
}


const Layout: React.FC<Props> = ({ left, logo = <DefaultLogo /> }) => {
  var site = Service.getRoot()
  const pages = site.usePages()

  return (
    <Router>
      <ViewPortWrap>
        <StyledTop size="40px">{logo}</StyledTop>
        <ViewPort>
          <LeftResizable
            scrollable
            maximumSize={500}
            minimumSize={250}
            size="280px"
            style={{
              borderRight: '1px solid #eee',
              background: '#f5f5f5',
            }}
          >
            {left}
          </LeftResizable>
          <Fill style={{ padding: 10 }} scrollable>
            {pages.map((page: Page) => (
              <BuildRoute page={page} key={page.key} />
            ))}
          </Fill>
        </ViewPort>
      </ViewPortWrap>
    </Router>
  )
}

const BuildRoute = ({ page }: { page: Page }) => {
  const childs = page.usePages()

  return (
    <>
      <Route
        path={page.getPath()}
        component={(props: object) => withPage(props)(page.component, page)}
        exact={page.exact}
      />
      {childs.map((child: Page) => (
        <BuildRoute page={child} key={child.key} />
      ))}
    </>
  )
}

function withPage<T>(props: object) {
  return function(
    Component: React.ComponentType<any> | React.FC<any>,
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
