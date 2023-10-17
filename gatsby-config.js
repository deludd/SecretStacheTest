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
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-anime`,
        short_name: `anime`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Tajawal`,
            file: `https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap`,
          },
          {
            name: `Bree Serif`,
            file: `https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap`,
          },
        ],
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
