/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `SecretStache Anime Website`,
    description: `Discover and explore your favorite anime.`,
    author: `Artem Dymytrov <adimitrov200@gmail.com>`,
    siteUrl: `https://your-site-url.com/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-anime`,
        short_name: `anime`,
        start_url: `/anime/page=1`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'ANILIST',
        fieldName: 'anilist',
        url: 'https://graphql.anilist.co',
      },
    },
  ],
};
