import React from 'react'
import styled from 'styled-components'
import { Page } from '../..'

const Breakcrumb: React.FC<{ page: Page }> = ({ page }) => {
  return (
    <Row>
      <Path>{page.getPath()}</Path>
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
