import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import Page from '../../models/Page'
import { DashoutModelType } from '../../models/Root'

type props = { page: Page; level: number }

export default ({ page, level }: props) => {
  return (
    <div>
      <StyledLink
        to={page.getPath()}
        style={{
          paddingLeft:
            level * (page.navigationOptions.childPaddingMultiplier || 0) + 5,
        }}
        exact
        data-child={page.parent.type === DashoutModelType.Page}
        className={page.haveChildWithEmptyPath() ? 'haveChildEmptyPath' : ''}
      >
        {page.navigationOptions.icon && (
          <IconWrap>{page.navigationOptions.icon}</IconWrap>
        )}
        <span style={{ paddingLeft: 8 }}>{page.title}</span>
      </StyledLink>
    </div>
  )
}

const StyledLink = styled(NavLink)`
  color: #666;
  display: block;
  // margin: 0.1em 0;
  text-decoration: none;
  font-size: 16px;
  padding: 5px;
  // border-radius: 6px;
  display: block;
  display: flex;
  align-items: center;
  height: 30px;
  line-height: 30px;

  &:hover {
    background: #ddd;
    color: #000;
  }
  &.active:not(.haveChildEmptyPath) {
    font-weight: 600;
    color: #000;
    background-color: #ddd;
    border-right: 3px solid #696969;
  }

  ${(props: { 'data-child': boolean }) =>
    props['data-child'] &&
    css`
      &.active {
        background-color: #ccc;
      }
    `}
`

const IconWrap = styled.div`
  padding: 3px;
`
