import React from 'react'
import styled from 'styled-components'
import { Page } from '../..'
import Breakcrumb from './Breakcrumb'

const Header: React.FC<{ page: Page }> = ({ page, children }) => {
  return (
    <div>
      <Breakcrumb page={page} />
      <Row>
        <div>
          <Title>{page.title}</Title>
        </div>
        <Controls>{page.headerOptions.controls}</Controls>
      </Row>
    </div>
  )
}

export default Header

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Title = styled.h2`
  margin: 5px 0;
`
