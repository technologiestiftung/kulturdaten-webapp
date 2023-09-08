> [!NOTE]
> This webapp is currently under development and not yet ready to be used by the public.

# About

The kulturdaten.berlin webapp that enables cultural actors to input and manage cultural data such as cultural offerings, events, locations.

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ZenVega"><img src="https://avatars.githubusercontent.com/u/50147356?v=4?s=100" width="100px;" alt="Urs Schmidt"/><br /><sub><b>Urs Schmidt</b></sub></a><br /><a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/commits?author=ZenVega" title="Code">💻</a> <a href="#ideas-ZenVega" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/commits?author=ZenVega" title="Tests">⚠️</a> <a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/pulls?q=is%3Apr+reviewed-by%3AZenVega" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ThorstenDiekhof"><img src="https://avatars.githubusercontent.com/u/121924163?v=4?s=100" width="100px;" alt="Thorsten Diekhof"/><br /><sub><b>Thorsten Diekhof</b></sub></a><br /><a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/commits?author=ThorstenDiekhof" title="Code">💻</a> <a href="#ideas-ThorstenDiekhof" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/pulls?q=is%3Apr+reviewed-by%3AThorstenDiekhof" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/commits?author=ThorstenDiekhof" title="Tests">⚠️</a> <a href="#infra-ThorstenDiekhof" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://herrherrmann.net/"><img src="https://avatars.githubusercontent.com/u/6429568?v=4?s=100" width="100px;" alt="Sebastian Herrmann"/><br /><sub><b>Sebastian Herrmann</b></sub></a><br /><a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/commits?author=herrherrmann" title="Code">💻</a> <a href="#ideas-herrherrmann" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/pulls?q=is%3Apr+reviewed-by%3Aherrherrmann" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/commits?author=herrherrmann" title="Tests">⚠️</a> <a href="#infra-herrherrmann" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/BugBoomBang"><img src="https://avatars.githubusercontent.com/u/30436389?v=4?s=100" width="100px;" alt="Simon Scholler"/><br /><sub><b>Simon Scholler</b></sub></a><br /><a href="#ideas-BugBoomBang" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Technologiestiftung Berlin/kulturdaten-webapp/pulls?q=is%3Apr+reviewed-by%3ABugBoomBang" title="Reviewed Pull Requests">👀</a> <a href="#design-BugBoomBang" title="Design">🎨</a> <a href="#content-BugBoomBang" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
   <td>
      Made by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-tsb-outline.svg" />
      </a>
    </td>
    <td>
      Supported by <a src="https://www.berlin.de/sen/kultur/en/">
        <br />
        <br />
        <img width="120" src="https://logos.citylab-berlin.org/logo-berlin-senkueu-en.svg" />
      </a>
    </td>
  </tr>
</table>
