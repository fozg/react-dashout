import React, { ReactElement } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Route, Redirect } from 'react-router-dom'
import Page from '../models/Page'
import DefaultLogo from './default/DefaultLogo'
import Header from './default/Header'
import { MasterLayout } from './default/_layouts/MasterLayout'
import Breakcrumb from './default/Breakcrumb'
import Root from '../models/Root'
import LightState from 'react-light-state'

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

const { useStore, setState } = new LightState(
  { isCollapse: false },
  'dashout-collapse',
  {
    storageName: 'dashout-collapse',
  },
)

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
  const isCollapse = useStore((state: any) => state.isCollapse)

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
              width: isCollapse ? 50 : 300,
            }}
          >
            <StyledLogo style={topNavStyles}>
              <LogoWrap style={logoWrapperStyles}>{logo}</LogoWrap>
            </StyledLogo>
            <Scrollable style={sidebarStyles}>
              <div style={{ width: 300 }}>{left}</div>
            </Scrollable>
            <Minize
              onClick={() => {
                setState({ isCollapse: !isCollapse })
              }}
              isCollapse={isCollapse}
            >
              <LeftIcon />
            </Minize>
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
  height: 'calc(100vh - 55px)',
  overflowY: 'auto',
  overflowX: 'hidden',
})
const FillLayout = styled.div({
  display: 'flex',
})
const Content = styled.div({
  flex: 1,
})
const LeftSizebar = styled.div({
  width: 300,
  height: '100vh',
  position: 'sticky',
  top: 0,
  bottom: 0,
  transition: 'width .5s',
  // overflow: 'hidden'
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
const Minize = styled.div<{ isCollapse: boolean }>`
  position: absolute;
  bottom: 20px;
  right: -15px;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  color: #999;
  transition: transform 0.6s ease;
  :hover {
    cursor: pointer;
    color: #111;
  }
  ${(props: any) => (props.isCollapse ? `transform: rotate(180deg)` : '')}
`

const LeftIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="chevron-left w-6 h-6">
    <path
      fill-rule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clip-rule="evenodd"
    ></path>
  </svg>
)
