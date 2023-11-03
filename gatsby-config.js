module.exports = {
  siteMetadata: {
    title: `SecretStache Anime Website`,
    description: `Discover and explore your favorite anime.`,
    author: `Artem Dymytrov <adimitrov200@gmail.com>`,
    siteUrl: `https://your-site-url.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-preload-fonts`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        base64Width: 20,
        defaultQuality: 50,
        stripMetadata: true,
        useMozJpeg: false,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'ANILIST',
        fieldName: 'anilist',
        url: 'https://graphql.anilist.co',
        batch: true,
        dataLoaderOptions: {
          maxBatchSize: 10,
        },
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
  ],
};
