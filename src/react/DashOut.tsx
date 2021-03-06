import React, { ReactElement } from 'react'
import { CSSProperties } from 'styled-components'
import Page from '../models/Page'
import NavigationItem from './NavigationGroupItems'
import Layout from './Layout'
import AppService, { IDashoutConfig } from '../models/AppServices'
import Root from '../models/Root'
import { BrowserRouter as Router } from 'react-router-dom'
import { IBreadcrumbStyles } from './default/Breakcrumb'

export const Service = new AppService()

interface IOnReadyCallback {
  (site: Root): void
}

type Props = {
  onReady?: IOnReadyCallback
  logo?: React.ReactNode
  config?: IDashoutConfig
  defaultRoute?: string
  isLogined?: boolean
  unauthorizeRoutes?: ReactElement
  topNavControls?: ReactElement,
  basename?: string
  topNavStyles?: CSSProperties,
  breadcrumbStyles?: IBreadcrumbStyles
  logoWrapperStyles?: CSSProperties
  sidebarStyles?: CSSProperties
}

// var site = Service.getRoot()

class DashOut extends React.Component<Props> {
  Service: AppService

  state = {
    loading: true,
  }

  constructor(props: Props) {
    super(props)
    this.Service = new AppService(this.props.config)
  }

  componentDidMount() {
    const { onReady } = this.props
    this.Service.init().then(root => {
      onReady && onReady(root)
      this.setState({ loading: false })
    })
  }

  render() {
    const { loading } = this.state
    const { isLogined = true, unauthorizeRoutes = 'unauthorize' } = this.props

    if (loading) {
      return <></>
    }
    if (!isLogined) {
      return unauthorizeRoutes
    }
    return <Wrap root={this.Service.getRoot()} {...this.props} />
  }
}

function Wrap({ root, basename, ...rest }: { root: Root, basename?: string }) {
  var pages = root.usePages()
  var isMasterLayoutEnable = root.useMasterLayoutEnabled()

  return (
    <Router basename={basename}>
      <Layout
        {...rest}
        pages={pages}
        root={root}
        className={isMasterLayoutEnable ? 'MasterLayout' : ''}
        left={
          <>
            {pages!.map((page: Page) =>
              page.navigationOptions.visible ? (
                <NavigationItem page={page} key={page.key} />
              ) : (
                false
              ),
            )}
          </>
        }
      ></Layout>
    </Router>
  )
}

export default DashOut
