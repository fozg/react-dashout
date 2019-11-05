import React, { ReactElement } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Fill, ViewPort, Top, LeftResizable } from 'react-spaces'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Page from '../models/Page'
import DefaultLogo from './default/DefaultLogo'
import Header from './default/Header'
import { MasterLayout } from './default/_layouts/MasterLayout'
import Breakcrumb from './default/Breakcrumb'
import Root from '../models/Root'

type Props = {
  left?: ReactElement
  logo?: ReactElement
  pages: Array<Page>
  topNavStyles?: CSSProperties
  defaultRoute?: string
  className: string
  root: Root
}

const Layout: React.FC<Props> = ({
  left,
  logo = <DefaultLogo />,
  pages,
  topNavStyles = {},
  defaultRoute,
  className,
  root,
}) => {
  // var site = Service.getRoot()
  // const pages = site.usePages()

  return (
    <Router>
      {defaultRoute && <Redirect exact from="/" to={defaultRoute} />}
      <ViewPortWrap className={className}>
        <StyledTopNav size="50px" style={topNavStyles}>
          <LogoWrap>{logo}</LogoWrap>
          <Breakcrumb root={root}></Breakcrumb>
        </StyledTopNav>

        <Fill>
          <LeftResizable
            scrollable
            maximumSize={500}
            minimumSize={250}
            size="280px"
            style={{
              borderRight: '1px solid #e0e0e0',
              background: '#f9f9f9',
            }}
          >
            {left}
          </LeftResizable>
          <Fill style={{ backgroundColor: '#eee' }} scrollable>
            {pages.map((page: Page) => (
              <div key={page.key}>
                <BuildRoute page={page} />
              </div>
            ))}
          </Fill>
        </Fill>
      </ViewPortWrap>
    </Router>
  )
}

const BuildRoute = ({ page }: { page: Page }) => {
  const childs = page.usePages()

  const parent =
    page.component === false ? (
      false
    ) : (
      <Route
        path={page.getPath()}
        render={(props: object) =>
          withPage({ props, Component: page.component, page })
        }
        exact={page.exact}
      />
    )

  const childPages = childs.map((child: Page) => (
    <BuildRoute page={child} key={child.key} />
  ))
  return page.contentOptions.layout === 'MasterLayout' ? (
    <MasterLayout left={parent} right={childPages} />
  ) : (
    <>
      {parent}
      {childPages}
    </>
  )
}

function withPage({ props, Component, page }: any) {
  if (Component === false) return <></>
  const parentLayout =
    page.parent.contentOptions && page.parent.contentOptions.layout
  // page.setActivePage()

  return (
    <MainPanelStyled
      style={{
        maxWidth: page.contentOptions.maxWidth,
        ...(parentLayout === 'MasterLayout'
          ? { width: 'calc(100% - 300px)' }
          : {}),
      }}
    >
      <ActivePage page={page} />
      {page.headerOptions.visible && <Header page={page} />}
      {/* <Inner /> */}
      <Component {...props} page={page} />
    </MainPanelStyled>
  )
}

class ActivePage extends React.Component<{ page: Page }> {
  componentDidMount() {
    setTimeout(() => {
      this.props.page.setActivePage()
    }, 100)
  }
  render() {
    return <></>
  }
}

export default Layout

const StyledTopNav = styled(Top)`
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ViewPortWrap = styled(ViewPort)`
  background-color: #fff;
`
const MainPanelStyled = styled.div`
  margin: 0 auto;
`
const LogoWrap = styled.div`
  width: 280px;
`
