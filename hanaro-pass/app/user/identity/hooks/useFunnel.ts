'use client';

import { useCallback, useState } from 'react';

type FunnelStep = 'intro' | 'ocr' | 'account' | 'result';

interface FunnelContext {
  identityType: 'passport' | 'alien' | null;
  identityData: Record<string, string> | null;
  accountData: Record<string, string> | null;
}

interface FunnelHistory {
  push: (step: FunnelStep, contextUpdate?: Partial<FunnelContext>) => void;
}

interface FunnelState {
  step: FunnelStep;
  context: FunnelContext;
}

export function useFunnel(initialState: FunnelState) {
  const [state, setState] = useState<FunnelState>(initialState);

  const history: FunnelHistory = {
    push: useCallback(
      (step: FunnelStep, contextUpdate?: Partial<FunnelContext>) => {
        setState((prev) => ({
          step,
          context: {
            ...prev.context,
            ...contextUpdate,
          },
        }));
      },
      [],
    ),
  };

  return {
    currentStep: state.step,
    context: state.context,
    history,
  };
}
