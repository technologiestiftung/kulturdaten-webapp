> [!NOTE]
> This webapp is currently under development and not yet ready to be used by the public.

# About

The kulturdaten.berlin webapp that enables cultural actors to input and manage cultural data such as cultural offerings, events, locations.

## Installation

1. Install a node version that matches the version defined in `.nvmrc` (if you’re using [nvm](https://github.com/nvm-sh/nvm), run `nvm install` and/or `nvm use` to switch to that version).
2. Install dependencies:
   ```shell
   npm install
   ```
3. Create a `.env` file and add all values (see `.env.example` for inspiration).
4. Generate the OpenAPI client:
   ```shell
   npm run generate-api
   ```

> [!NOTE]
> Make sure you have an instance of the [kulturdaten-api](https://github.com/technologiestiftung/kulturdaten-api) running locally. Alternatively, you can use a deployed API by adjusting `NEXT_PUBLIC_API_BASE_URL` in `.env`.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the Next.js development server.
- `npm run generate-api`: Generates an API client from an OpenAPI specification file (`openAPI-specs.yml`).
- `npm run format`: Runs Prettier to format source code.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run typecheck`: Runs TypeScript to check for type errors.
- `npm run build`: Builds the Next.js application for production usage.
- `npm start`: Starts the Next.js server for production usage.

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
