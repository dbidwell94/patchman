# Patchman

A fast, native cross-platform open source API viewer

## Roadmap

- Support for HTTP REST API's
- Support for GraphQL
- Support for WebSockets
- Support for raw TCP sockets
- Support for saving and sharing request / response history

## Tech Stack

| TypeScript                               | Rust                               | Compiler                            |
| ---------------------------------------- | ---------------------------------- | ----------------------------------- |
| [Preact](https://preactjs.com/)          | [Tauri](https://tauri.app/)        | [Vite](https://vitejs.dev/)         |
| [MUI](https://mui.com/)                  | [Reqwest](https://docs.rs/reqwest) | [Rustc](https://www.rust-lang.org/) |
| [React Router](https://reactrouter.com/) | [Serde](https://serde.rs/)         |                                     |

## Building

Requirements:

- Rust stable -- [Rustup](https://rustup.rs/)
- NodeJS -- [NodeJS](https://nodejs.org/en/)
- NPM -- [npm](https://www.npmjs.com/)
- (Optional) Visit [Tauri](https://tauri.app/v1/guides/getting-started/prerequisites) to view any prerequisites you may need to build locally

Building:

```bash
npm ci && npm run tauri build
```

Output will be in `<projectDir>/src-tauri/target/release/patchman<.systemExt?>`

## License

[MIT](https://choosealicense.com/licenses/mit/)
