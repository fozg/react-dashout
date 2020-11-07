import React from 'react'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import Page from '../models/Page'
import NavigationItem from './default/NavigationItem'

type Props = {
  page: Page
  level?: number
}

const isSelected2 = (itemPage: Page, activePage: Page | null): boolean => {
  if (!activePage) return false
  return activePage
    .getPathPages()
    .reduce((o, item) => o + item.key + '/', '')
    .includes(
      itemPage.getPathPages().reduce((o, item) => o + item.key + '/', ''),
    )
  // return false
}

const NavigationGroupItems: React.FC<RouteComponentProps & Props> = ({
  page,
  level = 0,
  location,
}) => {
  const childs = page.usePages()
  const activePage = page.Root.useActivePage()
  const _isSelected = isSelected2(page, activePage)
  if (!page.navigationOptions.visible) return <></>
  return (
    <Wrapper isSelelected={false} root={level === 0}>
      {page.navigationOptions.component ? (
        page.navigationOptions.component({ page, level })
      ) : (
        <NavigationItem
          page={page}
          level={level}
          isSelelected={_isSelected}
          haveChilds={childs.length !== 0 && level === 0}
        />
      )}

      <AnimatedCollapse style={{ maxHeight: _isSelected ? childs.length * 50 : 0 }}>
        {childs.map(page_child => (
          <WrapWithrouter
            page={page_child}
            level={level + 1}
            key={page_child.key}
          />
        ))}
      </AnimatedCollapse>
    </Wrapper>
  )
}

const WrapWithrouter = withRouter(NavigationGroupItems)

export default WrapWithrouter

const Wrapper = styled.div`
  ${(props: { isSelelected: boolean; root: boolean }) =>
    props.isSelelected &&
    css`
      background-color: #efefef;
      // border-right: 3px solid #bbb;
    `}
  ${(props: { root: boolean }) =>
    props.root &&
    css`
      margin: 4px 15px;
      overflow: hidden;
      border-radius: 10px;
      padding: 5px;
    `}
`
const AnimatedCollapse = styled.div`
  max-height: 0;
  overflow: hidden;
`
