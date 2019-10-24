import React, { ReactElement, useEffect } from 'react'
import styled, {
  keyframes,
  CSSProperties,
  css,
  createGlobalStyle,
} from 'styled-components'
import { Fill, ViewPort, Top, LeftResizable } from 'react-spaces'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import { Service } from './DashOut'
import Page from '../models/Page'
import DefaultLogo from './default/DefaultLogo'
import Header from './default/Header'
import MasterLayout from './default/_layouts/MasterLayout'
import DefaultLayout from './default/_layouts/DefaultLayout'
import Root from '../models/Root'

type Props = {
  left?: ReactElement
  logo?: ReactElement
  pages: Array<Page>
  topNavStyles?: CSSProperties
  defaultRoute?: string
  root: Root
}

const Layout: React.FC<Props> = ({
  left,
  logo = <DefaultLogo />,
  pages,
  topNavStyles = {},
  defaultRoute,
  root,
}) => {
  // var site = Service.getRoot()
  // const pages = site.usePages()
  var activePage = root.useActivePage()

  return (
    <Router>
      <GlobalStyle />
      {defaultRoute && <Redirect exact from="/" to={defaultRoute} />}
      <ViewPortWrap>
        <StyledTopNav size="50px" style={topNavStyles}>
          <Logo>{logo}</Logo>
          <Breadcrumb>{activePage && activePage.getPath()}</Breadcrumb>
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
              <RouterLayout className="fozg" horizontal>
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

  const left =
    page.component === false ? (
      false
    ) : (
      <Route
        path={page.getPath()}
        render={(props: object) => withPage(props)(page.component, page)}
        exact={page.exact}
        key={page.key}
      />
    )
  const right = childs.map((child: Page) => (
    <BuildRoute page={child} key={child.key} />
  ))

  return <DefaultLayout left={left} right={right} />
}

function withPage<T>(props: object) {
  return function(
    Component: React.ComponentType<any> | React.FC<any> | any,
    page: Page,
    Wrapper: any = page.contentWrapper || ContentWrapper,
  ) {
    if (Component === false) return <></>
    return (
      <Trigger page={page}>
        <MainPanel
          style={{
            maxWidth: page.contentOptions.maxWidth,
            flex: page.contentOptions.columns || 1,
          }}
        >
          {page.headerOptions.visible && <Header page={page} />}
          <Wrapper>
            <Component {...props} page={page} />
          </Wrapper>
        </MainPanel>
      </Trigger>
    )
  }
}

class Trigger extends React.Component {
  componentDidMount() {
    // @ts-ignore
    this.props.page.setFocus({ isFocus: true })
  }
  render() {
    return this.props.children
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
const Logo = styled.div``
const Breadcrumb = styled.div``
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
  ${(props: { masterDataActived: boolean }) =>
    props.masterDataActived &&
    css`
      padding: 0;
    `}
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

const GlobalStyle = createGlobalStyle`
  .scrollbar {
    background-color: #F5F5F5;
    float: left;
    height: 300px;
    margin-bottom: 25px;
    margin-left: 22px;
    margin-top: 40px;
    width: 65px;
      overflow-y: scroll;
  }

  .force-overflow {
    min-height: 450px;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`
