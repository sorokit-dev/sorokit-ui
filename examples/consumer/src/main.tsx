import React from "react";
import ReactDOM from "react-dom/client";
import {
  AddressChip,
  Button,
  ConnectButton,
  NetworkBadge,
  ToastProvider,
} from "@sorokit/ui";
import "@sorokit/ui/styles.css";
import "./index.css";

function App() {
  const address = "GABC1234567890XYZ";

  return (
    <ToastProvider>
      <main className="min-h-screen bg-slate-100 p-8 text-slate-900">
        <div className="mx-auto max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Sorokit UI</p>
              <h1 className="mt-2 text-2xl font-bold">Consumer smoke test</h1>
            </div>
            <ConnectButton />
          </div>

          <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <AddressChip address={address} network="TESTNET" />
            <NetworkBadge network="TESTNET" />
            <Button variant="secondary">Secondary action</Button>
          </div>
        </div>
      </main>
    </ToastProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
