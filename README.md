# Kulturdatenbank-App

The GUI of the Kulturdatenbank app.

## Installation

1. Clone this repository: `git clone git@github.com:username/repo.git`
2. Install dependencies: `npm install` or `yarn install`
3. Generate API client from OpenAPI spec: 
    - OpenAPI provides a .yml file with its specs via `http://localhost:3000/api/v1/spec`
    - This file has to be named `openAPI-specs.yml` and placed in the root directory
    - Run `npm run generate` and the client will be built in `src/generated-api-client`

## Available Scripts

In the project directory, you can run:

- `npm run build`: Builds the Next.js application for production usage.
- `npm run format`: Runs Prettier to format source code.
- `npm run run`: Runs the Next.js application with Node.js debugging enabled.
- `npm run start`: Runs the Next.js development server.
- `npm run update`: Updates dependencies with the `ncu` tool.
- `npm run generate`: Generates an API client from an OpenAPI specification file.

## Dependencies

- "@types/node": "18.16.0"
- "@types/react": "18.0.38"
- "@types/react-dom": "18.0.11"
- "autoprefixer": "10.4.14"
- "classnames": "^2.3.2"
- "eslint": "8.39.0"
- "eslint-config-next": "13.3.1"
- "next": "13.3.1"
- "openapi-types": "^12.1.0"
- "openapi-typescript-codegen": "^0.24.0"
- "postcss": "8.4.23"
- "react": "18.2.0"
- "react-dom": "18.2.0"
- "sass": "^1.62.0"
- "tailwindcss": "3.3.1"
- "typescript": "5.0.4"

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
    <td>
      A project by: <a href="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="src/assets/tsb-logo-text.png" />
      </a>
    </td>
    <td>
      Supported by: <a href="https://www.berlin.de/sen/inneres/">
        <br />
        <br />
        <img width="100" src="https://logos.citylab-berlin.org/logo-berlin-seninnds-en.svg" />
      </a>
    </td>
  </tr>
</table>