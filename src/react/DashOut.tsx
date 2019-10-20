import React, { ReactElement } from 'react'
import Page from '../models/Page'
import NavigationItem from './NavigationGroupItems'
import Layout from './Layout'
import AppService, { IDashoutConfig } from '../models/AppServices'
import Root from '../models/Root'

export const Service = new AppService()

interface IOnReadyCallback {
  (site: Root): void
}

type Props = {
  onReady?: IOnReadyCallback
  logo?: ReactElement
  config?: IDashoutConfig
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
    const { logo } = this.props

    if (loading) {
      return <></>
    }
    return <Wrap logo={logo} root={this.Service.getRoot()} />
  }
}

function Wrap({ logo, root }: { logo: any; root: Root }) {
  var pages = root.usePages()
  return (
    <Layout
      logo={logo}
      pages={pages}
      left={
        <>
          {pages &&
            pages.map((page: Page) =>
              page.navigationOptions.visible ? (
                <NavigationItem page={page} key={page.key} />
              ) : (
                false
              ),
            )}
        </>
      }
    >
    </Layout>
  )
}

export default DashOut
