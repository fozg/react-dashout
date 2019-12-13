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
  user-select: none;
  color: #666;
  display: block;
  text-decoration: none;
  font-size: 14px;
  padding: 5px;
  display: block;
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;

  &:hover {
    background: #ddd;
    color: #000;
    border-radius: 10px;
  }

  &.active:not(.haveChildEmptyPath) {
    font-weight: 700;
    color: #000;
    // background-color: #ddd;
    // box-shadow: 3px 0 0 0 #696969;
  }

  ${(props: { 'data-child': boolean }) =>
    props['data-child'] &&
    css`
      font-size: 14px;
      &.active {
        // background-color: #ccc;
      }
    `}
`

const IconWrap = styled.div`
  padding: 3px;
`
