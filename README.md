# Sorokit UI (`@sorokit/ui`)

[![CI](https://github.com/sorokit-dev/sorokit-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/sorokit-dev/sorokit-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modular library of accessible, themeable React components for Stellar dApps, built on [`@sorokit/core`](https://github.com/sorokit-dev/sorokit-core).

Sorokit UI sits on top of `@sorokit/core` to provide drop-in frontend patterns, so developers can skip UI prototyping and focus on smart contract logic.

> **Status: early development (0.x).** The component set is small and the API may change between minor versions. See [Known limitations](#known-limitations).

## Key capabilities

- **Connect button and wallet modal** — a ready-to-use wallet connection button with wallet icons (Freighter, Albedo, xBull), a connected state, and an accessible modal dialog built on Radix UI.
- **Transaction toasts** — pending / success / failed toasts. Pass the promise of a transaction to `useTxToast().track()` and the toast updates as it settles.
- **Tailwind CSS styling** — a Tailwind preset and CSS-variable theme tokens, with light and dark themes.

## Install

```bash
npm install @sorokit/ui @sorokit/core
```

Requires React 18 or newer and Tailwind CSS 3.

## Setup

1. Add the preset to your `tailwind.config.js`:

   ```js
   module.exports = {
     presets: [require("@sorokit/ui/tailwind-preset")],
     content: [
       "./src/**/*.{ts,tsx}",
       "./node_modules/@sorokit/ui/dist/**/*.js",
     ],
   };
   ```

2. Import the stylesheet once in your app entry:

   ```ts
   import "@sorokit/ui/styles.css";
   ```

3. Wrap your app in `ToastProvider` and drop in `ConnectButton`:

   ```tsx
   import { ToastProvider, ConnectButton } from "@sorokit/ui";

   export function App() {
     return (
       <ToastProvider>
         <ConnectButton />
       </ToastProvider>
     );
   }
   ```

## Transaction toasts

```tsx
import { useTxToast } from "@sorokit/ui";

function TransferButton({ send }: { send: () => Promise<unknown> }) {
  const { track } = useTxToast();
  return <button onClick={() => track(send(), { label: "Transfer" })}>Send</button>;
}
```

`track` shows a pending toast immediately and switches it to success or failed when the promise settles. It re-throws errors, so you can still handle them yourself.

## Components and hooks

| Export | Description |
|---|---|
| `ConnectButton` | Connect / connected-address button that opens the wallet modal |
| `WalletModal` | Modal listing the supported wallets |
| `WalletIcon` | Icon for Freighter, Albedo or xBull |
| `ToastProvider`, `TxToast` | Toast context and presentation |
| `useTxToast` | Track a transaction promise with a toast |
| `Button`, `Modal` | Shared primitives, exported for building on |
| `useWalletState` | UI-friendly wrapper over `@sorokit/core`'s `useWallet` |
| `useContractCall` | **Experimental**, see below |

## Dark mode

Toggle the `dark` class on the `html` element or any ancestor element — all components re-theme via CSS variables automatically. See [THEME.md](THEME.md) for the available tokens.

## Known limitations

- `useContractCall` only builds a contract invocation; it does not sign or submit a transaction. Use `useSorobanCall` from `@sorokit/core` for real calls and pass the resulting promise to `useTxToast().track()`.
- Wallet connection state is held per hook instance (`useWallet` in core uses local state), so it is not yet shared between components. A shared wallet provider is planned.
- Albedo and xBull are listed in the wallet modal, but their adapters in `@sorokit/core` are not implemented yet; only Freighter works end to end.

## Development

`@sorokit/ui` depends on `@sorokit/core` through a local `file:../sorokit-core` link during development. See [CONTRIBUTING.md](CONTRIBUTING.md) for the side-by-side setup.

```bash
npm install
npm run typecheck
npm run build
```

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Issues that are part of the Stellar Wave Program carry the `Stellar Wave` label and a complexity rating; apply to them through the Drips Wave app and wait to be assigned before starting.

Please report security issues privately, as described in [SECURITY.md](SECURITY.md).

## Independence

`@sorokit/ui` is maintained by the [sorokit-dev](https://github.com/sorokit-dev) organization. It is an independent project and is not affiliated with the separate `Sorokit` GitHub organization.

## License

[MIT](LICENSE)
