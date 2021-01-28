exports.createPages = async ({ actions: { createPage },  graphql}) => {
  console.log("holaa")
  createPage({
    path: "/no-data/",
    component: require.resolve("./src/templates/no-data.js"),
  })

  createPage({
      path: "/page-with-context/",
      component: require.resolve("./src/templates/with-context.js"),
      context: {
        title: "We Don’t Need No Stinkin’ GraphQL!",
        content: "<p>This is page content.</p><p>No GraphQL required!</p>",
      },
    })
  
    const result = await graphql(`
    {
      graphql {
        pages {
          nodes {
            id
            uri
          }
        }
      }
    }
  `)

  // pull the page data out of the query response
  const pages = result.data.graphql.pages.nodes

  // loop through WordPress pages and create a Gatsby page for each one
  pages.forEach(page => {
    console.log("EEEEEE")
    console.log(page)
    createPage({
      path: page.uri,
      component: require.resolve("./src/templates/page-template.js"),
      context: {
        id: page.id,
        jj: page.id,
      },
    })
  })
}