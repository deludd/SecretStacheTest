// gatsby-node.js
const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      rickandmorty {
        characters {
          info {
            pages
          }
          results {
            id
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for characters')
    return
  }

  const pageCount = result.data.rickandmorty.characters.info.pages

  const charactersTemplate = path.resolve(`src/templates/characters.js`)
  for (var i = 1; i <= pageCount; i++) {
    if (i > 0) {
      createPage({
        path: `/characters/page/${i}`,
        component: charactersTemplate,
        context: {
          page: i,
          totalPage: pageCount,
        },
      })
    }
  }
  

  // Создайте страницы inner-page для каждого персонажа
  const characterTemplate = path.resolve(`src/pages/inner-page.js`) // Обновите путь до вашей страницы
  result.data.rickandmorty.characters.results.forEach(character => {
    createPage({
      path: `/characters/id/${character.id}`, // Обновите путь для страниц персонажей
      component: characterTemplate,
      context: {
        id: character.id,
      },
    })
  })
}
