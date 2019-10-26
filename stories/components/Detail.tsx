import React from 'react'
import styled from 'styled-components'
import { Page } from '../../src'

type Props = {
  page: Page
}

export default function({ page }: Props) {
  return (
    <DetailWrap>
      This is detail page
      <code>{page.getPath()}</code>
    </DetailWrap>
  )
}

const DetailWrap = styled.div``
