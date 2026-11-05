# Contributing to sorokit-ui

Thanks for helping build accessible, well-designed UI for Stellar dApps. This guide covers everything you need to open a good pull request.

## Ways to contribute

- Improve accessibility (focus management, ARIA, keyboard navigation) of existing components
- Add component tests and visual examples
- Improve theming (light/dark tokens, Tailwind preset)
- Build new components that sit on top of `@sorokit/core`
- Improve documentation

Look for issues labeled `good first issue` or `help wanted`. Issues that are part of the **Stellar Wave Program** carry the `Stellar Wave` label and a complexity rating.

## Stellar Wave issues

If you want to work on a `Stellar Wave` issue, **apply through the [Drips Wave app](https://www.drips.network/wave)** and wait to be assigned. Please do not start work, or open a pull request, on a Wave issue that is assigned to someone else. Reference the issue in your pull request description with `Closes #<number>`.

Read the [Drips Wave terms](https://docs.drips.network/wave/terms-and-rules) before applying. In particular, low-effort submissions and untested or not-understood AI-generated code are not acceptable here or in the program.

## Development setup

Requirements: Node.js 20 or newer and npm.

`sorokit-ui` depends on [`sorokit-core`](https://github.com/sorokit-dev/sorokit-core) through a local `file:../sorokit-core` link, so clone both repositories **side by side** and build core first:

```bash
mkdir sorokit && cd sorokit
git clone https://github.com/sorokit-dev/sorokit-core.git
git clone https://github.com/sorokit-dev/sorokit-ui.git

cd sorokit-core && npm install && npm run build && cd ..
cd sorokit-ui && npm install
```

Useful commands (run inside `sorokit-ui`):

```bash
npm run typecheck   # TypeScript, no emit
npm run build       # Vite library build, outputs dist/
npm run dev         # rebuild on change
```

Typecheck and build must pass before you open a pull request. CI runs the same steps.

## Making a change

1. Fork the repository and create a branch from `main` (`fix/short-description` or `feat/short-description`).
2. Keep the change focused. One logical change per pull request.
3. Components must be accessible: keyboard operable, correctly labelled, and visible focus. Use the Radix primitives already in the project where they fit.
4. Style with Tailwind classes and the `sorokit-*` theme tokens in `src/theme/tokens.css`; support both light and dark themes.
5. Export new public components from `src/index.ts` and document them in the README.
6. Open a pull request and fill in the template. Include screenshots for visual changes and explain how you tested.

## Commit messages

Use short, imperative messages, optionally with a prefix: `fix: show connecting state per wallet`, `feat: add network badge`, `docs: fix setup snippet`.

## Code of conduct

By participating you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Security issues should be reported privately, see [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions are licensed under the MIT License.
