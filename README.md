# SecretStache Anime Website

Discover and explore your favorite anime with the SecretStache Anime Website!

## Author

Artem Dymytrov <adimitrov2000@gmail.com>

## Key Features

- Fetches data from the Anilist GraphQL API.
- Implements a robust search functionality using Lunr.
- Displays anime details with images fetched and processed via Gatsby's image handling.

## Setup

### Dependencies

This project uses several key dependencies:

- **gatsby**: For static site generation.
- **styled-components**: For styling components.
- **gatsby-plugin-image** and **gatsby-plugin-sharp**: For optimized image handling.
- **lunr**: For search functionality.
- **axios**: Promise based HTTP client for the browser and node.js.
- **babel-plugin-styled-components**: Toolset for writing CSS styles with JavaScript.
- **image-downloader**: A simple module to help download image to local.
- **html-react-parser**: For parsing HTML strings into React components.
- **gatsby-omni-font-loader**: Load fonts from Google Fonts, Typekit, Fonts.com, and Fontdeck.
- **gatsby-plugin-preload-fonts**: Preloads all necessary fonts per route to improve the performance of font delivery during the initial page load.
- ... and more. Check the `package.json` for a full list.

### Running Locally

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Before building your application, generate a font asset map with `npm run preload-fonts`
4. Download necessary images:
- Ensure your local server is running.
- Navigate to the `utils` directory.
- Run the command `node downloadImages.js`.
5. Start the development server with `npm run develop`.

## Scripts

- `npm run build`: Build the project for production.
- `npm run develop`: Start the local development server.
- `npm run start`: Alias for `npm run develop`.
- `npm run serve`: Serve the built project.
- `npm run clean`: Clear Gatsby's cache.
- `npm run format`: Format the codebase with Prettier.

## Repository

This project is hosted on GitHub. Check the repository [here](https://github.com/gatsbyjs/gatsby-starter-default).

## License

0BSD
