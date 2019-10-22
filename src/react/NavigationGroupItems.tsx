import React from 'react'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import Page from '../models/Page'
import NavigationItem from './default/NavigationItem'
import { DashoutModelType } from '../models/Root'

type Props = {
  page: Page
  level?: number
}

const isSelected = (page: Page, path: string): boolean => {
  var result =
    page.parent.type === DashoutModelType.Root && page.isChildHaveThisPath(path)
  // debugger
  return result
}

const NavigationGroupItems: React.FC<RouteComponentProps & Props>  = ({
  page,
  level = 0,
  location,
}) => {
  const childs = page.usePages()

  if (!page.navigationOptions.visible) return <></>;

  return (
    <Wrapper isSelelected={isSelected(page, location.pathname)}>
      {page.navigationOptions.component ? (
        page.navigationOptions.component({ page, level })
      ) : (
        <NavigationItem page={page} level={level} />
      )}
      <div>
        {childs.map(page_child => (
          <WrapWithrouter
            page={page_child}
            level={level + 1}
            key={page_child.key}
          />
        ))}
      </div>
    </Wrapper>
  )
}

const WrapWithrouter = withRouter(NavigationGroupItems)

export default WrapWithrouter

const Wrapper = styled.div`
  ${(props: { isSelelected: boolean }) =>
    props.isSelelected &&
    css`
      background-color: #e8e8e8;
      border-right: 3px solid #bbb;
    `}
`
