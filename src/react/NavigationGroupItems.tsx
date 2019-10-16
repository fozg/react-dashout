import React from 'react'
import Page from '../models/Page'
import NavigationItem from './default/NavigationItem'

type Props = {
  page: Page
  level?: number
}

const NavigationGroupItems: React.FC<Props> = ({ page, level = 0 }) => {
  const childs = page.usePages()

  return (
    <div>
      {page.navigationOptions.component ? (
        page.navigationOptions.component({ page, level })
      ) : (
        <NavigationItem page={page} level={level} />
      )}
      <div>
        {childs.map((page_c, idx) => (
          <NavigationGroupItems page={page_c} level={level + 1} />
        ))}
      </div>
    </div>
  )
}

export default NavigationGroupItems
