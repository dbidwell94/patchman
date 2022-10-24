
# Patchman

A fast, native cross-platform open source API viewer


## Roadmap

- Support for HTTP REST API's
- Support for GraphQL
- Support for WebSockets
- Support for raw TCP sockets
- Support for saving and sharing request history
## Tech Stack

|               TypeScript                |                    Rust                        |                  Compiler              |
|-----------------------------------------|------------------------------------------------|----------------------------------------|
| [React.JS](https://reactjs.org/)        | [Tauri](https://tauri.app/)                    |   [Vite](https://vitejs.dev/)          |
| [MUI](https://mui.com/)                 | [Raxios](https://github.com/dbidwell94/raxios) |   [Rustc](https://www.rust-lang.org/)  |
| [React Router](https://reactrouter.com/)| [Serde](https://serde.rs/)                     |                                        |

## Building

Requirements:

- Rust stable -- [Rustup](https://rustup.rs/)
- NodeJS -- [NodeJS](https://nodejs.org/en/)
- PNPM -- [pnpm](https://pnpm.io/)
- (Optional) Visit [Tauri](https://tauri.app/v1/guides/getting-started/prerequisites) to view any prerequisites you may need to build locally

Building:

```bash
pnpm i && pnpm run tauri build
```

Output will be in `<projectDir>/src-tauri/target/release/patchman<.systemExt?>`
## License

[MIT](https://choosealicense.com/licenses/mit/)

