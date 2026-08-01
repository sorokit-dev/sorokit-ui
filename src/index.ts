/// <reference path="./env.d.ts" />
import './theme/tokens.css';

// Components
export * from './components/shared/Button';
export * from './components/connect/ConnectButton';

// Theme
// Change this line to use a relative path with a specific export
import sorokitPreset from './theme/tailwind.config';
export { sorokitPreset };