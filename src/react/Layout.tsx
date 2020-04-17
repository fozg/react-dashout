import React, { ReactElement } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Route, Redirect } from 'react-router-dom'
import Page from '../models/Page'
import DefaultLogo from './default/DefaultLogo'
import Header from './default/Header'
import { MasterLayout } from './default/_layouts/MasterLayout'
import Breakcrumb from './default/Breakcrumb'
import Root from '../models/Root'

type Props = {
  left?: ReactElement
  logo?: ReactElement
  topNavControls?: ReactElement
  pages: Array<Page>
  defaultRoute?: string
  className: string
  root: Root
  topNavStyles?: CSSProperties
  breadcrumbStyles?: {
    linkStyles?: CSSProperties
    outerStyles?: CSSProperties
  }
  logoWrapperStyles?: CSSProperties
  sidebarStyles?: CSSProperties
}

const Layout: React.FC<Props> = ({
  left,
  topNavControls,
  logo = <DefaultLogo />,
  pages,
  topNavStyles = {},
  breadcrumbStyles = {},
  logoWrapperStyles,
  defaultRoute,
  className,
  sidebarStyles = {},
  root,
}) => {
  // var site = Service.getRoot()
  // const pages = site.usePages()
  const activePage = root.useActivePage()

  return (
    <>
      {defaultRoute && <Redirect exact from="/" to={defaultRoute} />}
      <FillLayout className={className + ' _dashout'}>
        {(!activePage || activePage.layouted) && (
          <LeftSizebar
            style={{
              // borderRight: '1px solid rgba(0,0,0,.1)',
              // boxShadow: 'inset 0 -1px 0 1px rgba(0,0,0,.1)',
              background: '#fff',
            }}
          >
            <StyledLogo style={topNavStyles}>
              <LogoWrap style={logoWrapperStyles}>{logo}</LogoWrap>
            </StyledLogo>
            <Scrollable style={sidebarStyles}>{left}</Scrollable>
          </LeftSizebar>
        )}

        <Content style={{ backgroundColor: '#eee' }}>
          <StyledTopNav style={topNavStyles}>
            <Row>
              <Breakcrumb
                root={root}
                breadcrumbStyles={breadcrumbStyles}
              ></Breakcrumb>
              {topNavControls}
            </Row>
          </StyledTopNav>
          {pages.map((page: Page) => (
            <div key={page.key}>
              <BuildRoute page={page} />
            </div>
          ))}
        </Content>
      </FillLayout>
    </>
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
    }, 0)
  }
  render() {
    return <></>
  }
}

export default Layout

const Scrollable = styled.div({
  height: '100%',
  overflow: 'auto',
})

const FillLayout = styled.div({
  display: 'flex',
  minHeight: '100vh',
})
const Content = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginLeft: 300,
})
const LeftSizebar = styled.div({
  width: 300,
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
})
const StyledTopNav = styled.div`
  background: #000;
  color: #fff;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 50px;
`
const StyledLogo = styled.div({
  height: 50,
})
const MainPanelStyled = styled.div`
  margin: 0 auto;
`
const LogoWrap = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`
