import preset from "./tailwind-preset.cjs";

/**
 * Tailwind config for developing this package. It reuses the same preset that
 * consumers install, so the tokens (sorokit-bg, sorokit-accent, ...) are
 * defined in exactly one place.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
};
