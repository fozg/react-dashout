import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Root from '../../models/Root'

const Breakcrumb: React.FC<{ root: Root }> = ({ root }) => {
  const activePage = root.useActivePage()
  return (
    <Row>
      <Path>
        {activePage &&
          activePage.getPathPages().map((item, idx) => (
            <Item key={item.key}>
              <LinkStyled to={item.getPath()}>{item.title}</LinkStyled>
              <Splash>/</Splash>
            </Item>
          ))}
      </Path>
    </Row>
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
  font-size: 14px;
  padding: 1px 6px;
  border-radius: 6px;
  transition: all 0.5s;
  :hover {
    transition: none;
    color: #000;
    cursor: pointer;
    background-color: #ececec;
  }
`
