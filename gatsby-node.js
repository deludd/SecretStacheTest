const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

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
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for characters');
    return;
  }

  const characters = result.data.rickandmorty.characters.results;
  const charactersPerPage = 6;
  const pageCount = Math.ceil(characters.length / charactersPerPage);

  const charactersTemplate = path.resolve(`src/templates/characters.js`);
  const characterTemplate = path.resolve(`src/templates/character.js`);

  for (let page = 1; page <= pageCount; page++) {
    const charactersOnPage = characters.slice(
      (page - 1) * charactersPerPage,
      page * charactersPerPage
    );

    createPage({
      path: `/characters/page/${page}`, // Используйте обратные кавычки для строк
      component: charactersTemplate,
      context: {
        page,
        totalPage: pageCount,
        charactersOnPage, // Передайте персонажей для текущей страницы
      },
    });

    charactersOnPage.forEach(character => {
      createPage({
        path: `/characters/page/${page}/${character.id}`, // Используйте обратные кавычки для строк
        component: characterTemplate,
        context: {
          id: character.id,
        },
      });
    });
  }
}
