import React from 'react'
import styled from 'styled-components'

type Props = {
  left: React.ReactNode
  right: React.ReactNode
  masterEnabled?: boolean
}

const MasterLayout: React.FC<Props> = ({
  left,
  right,
  masterEnabled = false,
}) => (
  <Fill>
    <Left>
      <LeftInner className="Gallery">{left}</LeftInner>
    </Left>
    <Right>{right}</Right>
  </Fill>
)

export default MasterLayout

const Left = styled.div`
  min-width: 300px;
  overflow: auto;
  flex: 1;

  &.masterEnabled {
    width: 300px;
  }
`
const LeftInner = styled.div`
`
const Right = styled.div`
  height: 100%;
  overflow: auto;
`

const Fill = styled.div`
  // display: flex;
  // flex: 1;
  // height: 100%;
  // position: absolute;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // top: 0;

  &.masterEnabled {
    ${Left} {
      max-width: 200px;
      border-right: 1px solid #ddd;
      background-color: #f9f9f9;
    }
    ${Right} {
      flex: 1
    }
  }
`
