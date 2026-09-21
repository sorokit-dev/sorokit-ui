# Sorokit UI (`@sorokit/ui`)

A modular library of pre-built, beautifully designed, and highly accessible user interface components engineered specifically for Stellar dApps.

Good developer tooling isn't just about fast logic—it's about creating a frictionless user experience. Sorokit UI sits directly on top of `@sorokit/core` to provide drop-in frontend patterns, allowing developers to skip UI prototyping and focus on core smart contract logic.

## Key Capabilities

- **Frictionless Connect Buttons** — Ready-to-use wallet connection buttons with built-in asset icons, connected states, and modal dialogs.
- **Interactive Transaction Toasts** — Dynamic feedback banners that monitor real-time transaction progress (pending, success, or failure) using raw event streams from the core package.
- **Styled with Tailwind CSS** — Clean utility-first classes making customization, branding, and theme integration (light/dark mode) a matter of editing a single config.

Beautiful user experiences, ready to drop straight into your workspace.

## Install

\`\`\`bash
npm install @sorokit/ui @sorokit/core
\`\`\`

## Setup

1. Add the preset to your \`tailwind.config.js\`:

\`\`\`js
module.exports = {
  presets: [require("@sorokit/ui/tailwind-preset")],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@sorokit/ui/dist/**/*.js",
  ],
};
\`\`\`

1. Import the stylesheet once in your app entry:

\`\`\`ts
import "@sorokit/ui/styles.css";
\`\`\`

1. Wrap your app in \`ToastProvider\` and drop in \`ConnectButton\`:

\`\`\`tsx
import { ToastProvider, ConnectButton } from "@sorokit/ui";

export function App() {
  return (
    <ToastProvider>
      <ConnectButton />
    </ToastProvider>
  );
}
\`\`\`

## Dark mode

Toggle the \`dark\` class on the html element or any ancestor element — all components re-theme via CSS variables automatically.
