import { default as React, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Page } from '../../src'

type Props = { page: Page }

function Listing({ page }: Props) {
  const isMasterLayoutEnabled = page.Root.useMasterLayoutEnabled()

  return (
    <Card isMasterLayoutEnabled={isMasterLayoutEnabled}>
      {Array(20)
        .fill(0)
        .map((item: any, idx: number) => (
          <ListItem key={idx}>This is item number {idx}</ListItem>
        ))}
    </Card>
  )
}

export default Listing

type CardProps = {
  isMasterLayoutEnabled: boolean
}

const ListItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 20px;
  font-size: 14px;
  cursor: pointer;
  &:last-of-type {
    border: none;
  }
  &:hover {
    background-color: #efefef;
  }
`
const Card = styled.div`
  background-color: #fff;
  padding: 20px 0;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px -1px;
  ${(props: CardProps) =>
    props.isMasterLayoutEnabled &&
    css`
      padding: 0;
      border-radius: 0;
      margin: 0;
      background-color: transparent;
      box-shadow: none;

      ${ListItem} {
        padding: 8px 10px;
        border-bottom-color: #ddd;
        &:hover {
          background-color: #ddd;
        }
      }
    `};
`
