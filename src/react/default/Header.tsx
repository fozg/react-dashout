import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Page } from '../..'
import Breakcrumb from './Breakcrumb'

const Header: React.FC<{ page: Page }> = ({ page, children }) => {
  return (
    <Wrap>
      <AnimatedContent>
        <Breakcrumb page={page} />
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
const Wrap = styled.div`
  padding: 10px 20px;
  overflow: hidden;
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
