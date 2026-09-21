/**
 * @sorokit/ui Tailwind preset.
 *
 * Consumers add this to their own tailwind.config.js:
 *
 *   module.exports = {
 *     presets: [require("@sorokit/ui/tailwind-preset")],
 *     content: [
 *       "./src/**\/*.{ts,tsx}",
 *       "./node_modules/@sorokit/ui/dist/**\/*.js",
 *     ],
 *   };
 *
 * Colors resolve through CSS variables (defined in theme/tokens.css) so
 * switching --sorokit-* variables (e.g. via a `.dark` class) re-themes
 * every component with zero Tailwind rebuild.
 */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sorokit: {
          bg: "rgb(var(--sorokit-bg) / <alpha-value>)",
          surface: "rgb(var(--sorokit-surface) / <alpha-value>)",
          border: "rgb(var(--sorokit-border) / <alpha-value>)",
          text: "rgb(var(--sorokit-text) / <alpha-value>)",
          "text-muted": "rgb(var(--sorokit-text-muted) / <alpha-value>)",
          accent: "rgb(var(--sorokit-accent) / <alpha-value>)",
          "accent-fg": "rgb(var(--sorokit-accent-fg) / <alpha-value>)",
          success: "rgb(var(--sorokit-success) / <alpha-value>)",
          danger: "rgb(var(--sorokit-danger) / <alpha-value>)",
          pending: "rgb(var(--sorokit-pending) / <alpha-value>)",
        },
      },
      borderRadius: {
        sorokit: "var(--sorokit-radius)",
      },
    },
  },
  plugins: [],
};
