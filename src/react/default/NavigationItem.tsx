import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Page from '../../models/Page'

type props = { page: Page; level: number }
const CHILD_PADDING_LEFT = 15

export default ({ page, level }: props) => {
  return (
    <div>
      <StyledLink
        to={page.getPath()}
        style={{ paddingLeft: level * CHILD_PADDING_LEFT + 5 }}
      >
        <span style={{paddingLeft: 8}}>{page.title}</span>
      </StyledLink>
    </div>
  )
}

const StyledLink = styled(Link)`
  color: #666;
  display: block;
  margin: 0.1em 0;
  text-decoration: none;
  font-size: 16px;
  padding: 5px;
  border-radius: 6px;
  display: block;
  display: flex;
  align-items: center;

  &:hover {
    background: #ddd;
    color: #000;
  }
  &.active {
    color: red;
  }
`
