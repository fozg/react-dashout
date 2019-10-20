import React, { ReactElement, useEffect, useState } from 'react'
import Page from '../models/Page'
import NavigationItem from './NavigationGroupItems'
import Layout from './Layout'
import AppService from '../models/AppServices'
import Root from '../models/Root'

export const Service = new AppService()

interface IOnReadyCallback {
  (site: Root): void
}

type Props = { onReady?: IOnReadyCallback; logo?: ReactElement }

var site = Service.getRoot()

const DashOut: React.FC<Props> = ({ onReady, logo }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Service.init().then(root => {
      onReady && onReady(root)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <></>
  }
  return <Wrap logo={logo} />
}

function Wrap({ logo }: Props) {
  var pages = site.usePages()
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
      Test
    </Layout>
  )
}

export default DashOut
