import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Link } from 'react-router-dom'
import Root from '../../models/Root'
import { Page } from '../..'

export interface IBreadcrumbStyles {
  linkStyles?: CSSProperties
  outerStyles?: CSSProperties
}

const Breakcrumb: React.FC<{
  root: Root
  breadcrumbStyles?: IBreadcrumbStyles
}> = ({ root, breadcrumbStyles }) => {
  const activePage = root.useActivePage()
  return (
    <Row style={breadcrumbStyles && breadcrumbStyles.outerStyles}>
      <Path>
        {activePage &&
          activePage.getPathPages().map((item, idx) => (
            <Item key={item.key}>
              <Title
                item={item}
                style={breadcrumbStyles && breadcrumbStyles.linkStyles}
              />
              <Splash>/</Splash>
            </Item>
          ))}
      </Path>
    </Row>
  )
}

const Title = ({ item, style }: { item: Page; style?: CSSProperties }) => {
  const state = item.useState()
  return (
    <LinkStyled to={item.getPath()} style={style}>
      {state.breadcrumbTitle}
    </LinkStyled>
  )
}

export default Breakcrumb

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Path = styled.span`
  color: #aaa;
  font-size: 12px;
`
const Splash = styled.span`
  padding: 0 3px;
  color: #999;
`
const Item = styled.span`
  &:last-child ${Splash} {
    display: none;
  }
`
const LinkStyled = styled(Link)`
  color: #444;
  text-decoration: none;
  font-size: 13px;
  padding: 1px 6px;
  border-radius: 6px;
  transition: all 0.5s;
  :hover {
    transition: none;
    color: #000;
    cursor: pointer;
    background-color: rgba(255,255,255,.3);
  }
`
