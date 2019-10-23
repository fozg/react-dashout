import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function() {
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
  color: #1ea7fd;
  padding: 20px;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
  :last-of-type {
    border-bottom: none;
  }
`
