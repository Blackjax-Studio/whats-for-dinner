import { useSyncExternalStore } from 'react';

export type OpenAiGlobals = {
  toolInput?: any;
  toolOutput?: {
    dishName?: string;
    options?: Array<{ title?: string; name?: string; description?: string; type?: string }>;
    structuredContent?: {
        dishName?: string;
        options?: Array<{ title?: string; name?: string; description?: string; type?: string }>;
    };
  };
  toolResponseMetadata?: any;
  widgetState?: any;
  locale?: string;
};

type SetGlobalsEvent = CustomEvent<{
  globals: Partial<OpenAiGlobals>;
}>;

const SET_GLOBALS_EVENT_TYPE = 'openai:set_globals';

export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(
  key: K
): OpenAiGlobals[K] {
  return useSyncExternalStore(
    (onChange) => {
      const handleSetGlobal = (event: SetGlobalsEvent) => {
        const value = event.detail.globals[key];
        if (value === undefined) {
          return;
        }

        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal as EventListener, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal as EventListener);
      };
    },
    () => window.openai?.[key]
  );
}

export interface OpenAiApi {
  callTool: (toolName: string, args: any) => Promise<any>;
  sendFollowUpMessage: (options: { prompt: string }) => Promise<any>;
  [key: string]: any;
}

declare global {
  interface Window {
    openai?: OpenAiApi;
  }
}

export function useToolOutput() {
  return useOpenAiGlobal("toolOutput");
}
