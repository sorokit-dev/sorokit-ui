import * as React from 'react';

export interface UseClipboardOptions {
  resetAfterMs?: number;
}

export interface UseClipboardResult {
  copied: boolean;
  copy: (value: string) => Promise<void>;
}

export function useClipboard(options: UseClipboardOptions = {}): UseClipboardResult {
  const { resetAfterMs = 1800 } = options;
  const [copied, setCopied] = React.useState(false);
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = React.useCallback(
    async (value: string) => {
      if (!value) return;

      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);

      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }

      resetTimer.current = setTimeout(() => {
        setCopied(false);
        resetTimer.current = null;
      }, resetAfterMs);
    },
    [resetAfterMs],
  );

  React.useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  return { copied, copy };
}
