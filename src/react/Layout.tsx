import React, { ReactElement } from 'react'
import styled, { keyframes, CSSProperties, css } from 'styled-components'
import { Fill, ViewPort, Top, LeftResizable } from 'react-spaces'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import { Service } from './DashOut'
import Page from '../models/Page'
import DefaultLogo from './default/DefaultLogo'
import Header from './default/Header'

type Props = {
  left?: ReactElement
  logo?: ReactElement
  pages: Array<Page>
  topNavStyles?: CSSProperties
  defaultRoute?: string
}

const Layout: React.FC<Props> = ({
  left,
  logo = <DefaultLogo />,
  pages,
  topNavStyles = {},
  defaultRoute,
}) => {
  // var site = Service.getRoot()
  // const pages = site.usePages()

  return (
    <Router>
      {defaultRoute && <Redirect exact from="/" to={defaultRoute} />}
      <ViewPortWrap>
        <StyledTopNav size="40px" style={topNavStyles}>
          {logo}
        </StyledTopNav>
        <ViewPort>
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
          <Fill style={{ padding: 10, backgroundColor: '#eee' }} scrollable>
            {pages.map((page: Page) => (
              <RouterLayout
                className="fozg"
                horizontal
              >
                <BuildRoute page={page} />
              </RouterLayout>
            ))}
          </Fill>
        </ViewPort>
      </ViewPortWrap>
    </Router>
  )
}

const BuildRoute: any = ({ page }: { page: Page }) => {
  const childs = page.usePages()

  return (
    <>
      {page.component === false ? (
        false
      ) : (
        <Route
          path={page.getPath()}
          render={(props: object) => withPage(props)(page.component, page)}
          exact={page.exact}
          key={page.key}
        />
      )}
      {childs.map((child: Page) => (
        <BuildRoute page={child} key={child.key} />
      ))}
    </>
  )
}

function withPage<T>(props: object) {
  return function(
    Component: React.ComponentType<any> | React.FC<any> | any,
    page: Page,
  ) {
    if (Component === false) return <></>

    return (
      <MainPanel
        style={{
          maxWidth: page.contentOptions.maxWidth,
          flex: page.contentOptions.columns || 1,
        }}
      >
        {page.headerOptions.visible && <Header page={page} />}
        <ContentWrapper>
          <Component {...props} page={page} />
        </ContentWrapper>
      </MainPanel>
    )
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
const MainPanel = styled.div`
  margin: 0 auto;
`

const transform = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px)
  }
`

export const ContentWrapper = styled.div`
  margin: 0 10px;
  background-color: #fff;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
  animation: ${transform} 0.3s;
`

const RouterLayout = styled.div`
  ${(props: { horizontal: boolean }) =>
    props.horizontal &&
    css`
      display: flex;
      align-items: top;
      flex-direction: row;
    `}
`
