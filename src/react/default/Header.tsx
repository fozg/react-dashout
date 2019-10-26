import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Page } from '../..'

const Header: React.FC<{ page: Page; parentLayout?: string }> = ({
  page,
  parentLayout,
  // children,
}) => {
  return (
    <Wrap>
      <AnimatedContent>
        {parentLayout !== 'MasterLayout' && <Back>Back</Back>}
        <Row>
          <div>
            <Title>{page.title}</Title>
          </div>
          <Controls>{page.headerOptions.controls}</Controls>
        </Row>
      </AnimatedContent>
    </Wrap>
  )
}

export default Header

const animate = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
`
const AnimatedContent = styled.div`
  animation: ${animate} 0.3s;
`
const Back = styled.div`
  display: none;
  font-weight: 700;
`
const Wrap = styled.div`
  padding: 10px 20px;
  overflow: hidden;
  .MasterLayout & {
    ${Back} {
      display: block;
    }
  }
`
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
  margin: 0;
`
