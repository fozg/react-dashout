import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function({page}) {
  const isFocus = page.useFocus();
  console.log('list', isFocus)
  return Array(20)
    .fill(null)
    .map((i, idx) => (
      <ListItem key={idx} to={`/dashboard/analytics/${idx}`}>
        List item number {idx}
      </ListItem>
    ))
}

const ListItem = styled(Link)`
  border-bottom: 1px solid #eee;
  display: block;
  color: #555;
  padding: 20px;
  cursor: pointer;
  text-decoration: unset;
  :hover {
    background-color: #eee;
  }
  :last-of-type {
    border-bottom: none;
  }
`
