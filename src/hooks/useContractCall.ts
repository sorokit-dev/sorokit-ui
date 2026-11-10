import { useCallback, useState } from "react";
import { useContract as useCoreContract, type NetworkConfig } from "@sorokit/core";

/**
 * Lifecycle status for a UI-facing contract call.
 *
 * **Experimental.** @sorokit/core's useContract returns a raw Stellar contract
 * handle plus the RPC server, and this hook tracks a call lifecycle around it.
 * Today `call()` only builds the contract invocation (`Contract.call()` returns
 * an operation); it does not simulate, sign, or submit a transaction. For a
 * real on-chain call use `useSorobanCall` from @sorokit/core, and pass its
 * promise to `useTxToast().track()` to show a toast. Wiring this hook to the
 * full flow needs a wallet state shared between components, which is tracked
 * as follow-up work.
 */
export type CallStatus = "idle" | "pending" | "success" | "error";

export interface UseContractCallOptions {
  contractId: string;
  networkConfig: NetworkConfig;
}

export interface UseContractCallResult<TResult = unknown> {
  status: CallStatus;
  result: TResult | null;
  error: string | null;
  call: (method: string, ...args: unknown[]) => Promise<TResult>;
  contract: ReturnType<typeof useCoreContract>["contract"];
  server: ReturnType<typeof useCoreContract>["server"];
}

export function useContractCall<TResult = unknown>({
  contractId,
  networkConfig,
}: UseContractCallOptions): UseContractCallResult<TResult> {
  const { contract, server } = useCoreContract({ contractId, networkConfig });

  const [status, setStatus] = useState<CallStatus>("idle");
  const [result, setResult] = useState<TResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (method: string, ...args: unknown[]) => {
      setStatus("pending");
      setError(null);
      try {
        const value = (await (contract as any).call(method, ...args)) as TResult;
        setResult(value);
        setStatus("success");
        return value;
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Contract call failed");
        throw err;
      }
    },
    [contract]
  );

  return { status, result, error, call, contract, server };
}
