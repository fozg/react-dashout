import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

export default withRouter(function({ location, match }) {
  return (
    <View>
      <h3>This is view {JSON.stringify(match)}</h3>
    </View>
  )
})

const View = styled.div`
  padding: 30px;
`
