import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import Page from '../../models/Page'
import { DashoutModelType } from '../../models/Root'

type props = {
  page: Page
  level: number
  isSelelected?: boolean
  haveChilds?: boolean
}

export default ({ page, level, isSelelected, haveChilds }: props) => {
  return (
    <Wrapper isSelelected={isSelelected} haveChilds={haveChilds} level={level}>
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
        <Flex justifyContent="space-between" style={{ width: '100%' }}>
          <Flex>
            {page.navigationOptions.icon && (
              <IconWrap>{page.navigationOptions.icon}</IconWrap>
            )}
            <span style={{ paddingLeft: 8 }}>{page.title}</span>
          </Flex>
          {page.navigationOptions.badge && (
            <Badge>{page.navigationOptions.badge} </Badge>
          )}
        </Flex>
      </StyledLink>
    </Wrapper>
  )
}

const Flex = styled.div<{ justifyContent?: string }>`
  display: flex;
  ${props =>
    props.justifyContent ? { justifyContent: props.justifyContent } : null}
`
const Wrapper = styled.div<{ isSelelected: any; haveChilds: any; level: any }>(
  (props: any) => ({
    ...(props.isSelelected && {
      backgroundColor: '#eee',
      borderRadius: 10,

      a: { color: '#007bdc', fontWeight: 400 },
      ...(props.haveChilds && {
        backgroundColor: 'transparent',
        a: { color: '#000', fontWeight: 500 },
      }),
    }),
  }),
)
const StyledLink = styled(NavLink)`
  user-select: none;
  color: #666;
  display: block;
  text-decoration: none;
  font-size: 14px;
  padding: 5px;
  display: block;
  font-weight: 400;
  display: flex;
  align-items: center;
  min-height: 34px;
  margin: 1px 0;
  // line-height: 40px;
  box-sizing: border-box;

  &:hover {
    background: #efefef;
    border-radius: 10px;
  }

  &.active:not(.haveChildEmptyPath) {
    // font-weight: 700;
    // color: #000;
    // border-radius: 10px;
    // background-color: #eee;
    // box-shadow: 3px 0 0 0 #696969;
  }

  ${(props: { 'data-child': boolean }) =>
    props['data-child'] &&
    css`
      // font-size: 14px;
      &.active {
        // background-color: #ccc;
      }
    `}
`

const IconWrap = styled.div`
  // padding: 3px;
`
const Badge = styled.div`
  border-radius: 20px;
  background: #ddd;
  padding: 2px 5px;
  font-size: 12px;
  font-weight: 500;
`
