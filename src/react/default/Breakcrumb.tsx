import React from 'react'
import styled from 'styled-components'
import Root from '../../models/Root'

const Breakcrumb: React.FC<{ root: Root }> = ({ root }) => {
  const activePage = root.useActivePage()
  return (
    <Row>
      <Path>
        {activePage &&
          activePage
            .getPathPages()
            .map((item, idx) => <Item>{item.title}</Item>)}
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
const Item = styled.div`
  
`
