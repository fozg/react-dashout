import React from 'react'
// import styled from 'styled-components'
// import { Fill, Left, Right } from 'react-spaces'

type Props = {
  left: React.ReactNode
  right: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({ left, right }) => (
  <>
    {left}
    {right}
  </>
)

export default DefaultLayout
