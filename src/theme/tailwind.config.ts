import type { Config } from 'tailwindcss';

const sorokitPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        sorokit: {
          primary: "rgb(var(--sorokit-primary) / <alpha-value>)",
          background: "rgb(var(--sorokit-background) / <alpha-value>)",
          muted: "rgb(var(--sorokit-muted) / <alpha-value>)",
        }
      },
      borderRadius: {
        sorokit: "var(--sorokit-radius)",
      }
    },
  },
  plugins: [],
};

export default sorokitPreset;