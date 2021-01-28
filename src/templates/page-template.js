import React from "react"

import { graphql } from "gatsby"

export const query = graphql`
  query($id: ID!) {
    graphql {
      page(id: $id) {
        title
        content
      }
    }
  }
`

const PageTemplate = props => {
  console.log(props)
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

export default PageTemplate