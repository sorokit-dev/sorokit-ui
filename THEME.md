# Sorokit UI Theme

Sorokit UI uses Tailwind utility classes only. There is no stylesheet to import and no CSS-in-JS runtime.

The shared accent is Tailwind `sky`, primarily `sky-600` for calls to action, focus rings, and pending transaction indicators. Neutral surfaces use `slate` so components can sit on light or dark app backgrounds, with `dark:` variants included on every surface.

Status colors are reserved for semantic feedback:

- `emerald` for success
- `red` for errors
- `amber` for network mismatch warnings
- `violet` only for the Futurenet network dot

Consumers can override styling with each component's `className` prop or by wrapping components in their own layout.
