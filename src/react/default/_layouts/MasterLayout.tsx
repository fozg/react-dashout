import React from 'react'
import styled from 'styled-components'

type Props = {
  left: React.ReactNode
  right: React.ReactNode
}

export const MasterLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <Wrapper>
      <Left>{left}</Left>
      {right}
    </Wrapper>
  )
}

export const MasterLayouInner: React.FC = ({ children }) => {
  return <WrapperInner>{children}</WrapperInner>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  .MasterLayout & {
    background-color: #fff;
  }
`
const Left = styled.div`
  flex: 1;
  background-color: #eee;
  border-right: 1px solid #ddd;
  overflow: auto;
  .MasterLayout & {
    height: calc(100vh - 50px);
  }
`
const WrapperInner = styled.div`
  border: 1px solid green;
  padding: 20px;
`
