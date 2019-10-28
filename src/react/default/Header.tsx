import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { Page } from '../..'

const DefaultHeaderComponentMasterLayout = ({
  title,
  link,
}: {
  title: String
  link: string
}) => <Link to={link}>Go back ({title})</Link>

const Header: React.FC<{ page: Page }> = ({ page }) => {
  const isMasterLayout = page.Root.useMasterLayoutEnabled()
  return (
    <Wrap>
      <AnimatedContent>
        {isMasterLayout &&
        page.contentOptions &&
        page.contentOptions.layout === 'MasterLayout' ? (
          <DefaultHeaderComponentMasterLayout
            title={page.title}
            link={page.getPath()}
          />
        ) : (
          <Row>
            <div>
              <Title>{page.title}</Title>
            </div>
            <Controls>{page.headerOptions.controls}</Controls>
          </Row>
        )}
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
