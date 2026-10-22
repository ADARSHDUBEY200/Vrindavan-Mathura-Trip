"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SAVE_DELAY_MS = 500;

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage unavailable (private mode, blocked site data): nothing to clear.
  }
}

type Options = {
  /** Edit pages pass false until the row has loaded, so the loaded data becomes the baseline. */
  ready?: boolean;
};

/**
 * Autosaves form data to localStorage.
 * (a) No saved draft: saves every change, but never the untouched initial form.
 * (b) A draft exists: shows the restore banner and holds off saving until the
 *     user restores or dismisses it.
 * (c) The user ignores the banner and edits: saving starts and overwrites the old draft.
 *
 * Must run client-side only (the editors are loaded with ssr: false), because
 * the initial draft check reads localStorage during the first render.
 */
export function useAutoSave<T>(key: string, data: T, { ready = true }: Options = {}) {
  const [hadDraft] = useState(() => readStorage(key) !== null);
  const [showRestoreBanner, setShowRestoreBanner] = useState(hadDraft);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const enabled = useRef(!hadDraft);
  const baseline = useRef<string | null>(null);
  const pending = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const serialized = JSON.stringify(data);

  useEffect(() => {
    if (!ready) return;
    if (baseline.current === null) {
      baseline.current = serialized;
      return;
    }
    if (serialized === baseline.current) return;

    pending.current = serialized;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      const value = pending.current;
      pending.current = null;
      if (value === null || value === baseline.current) return;
      if (!enabled.current) {
        // (c) The user started typing instead of answering the banner.
        enabled.current = true;
        setShowRestoreBanner(false);
      }
      if (writeStorage(key, value)) setLastSaved(new Date());
    }, SAVE_DELAY_MS);
  }, [key, ready, serialized]);

  // Write any change still waiting on the debounce when the editor unmounts.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (pending.current !== null && pending.current !== baseline.current && enabled.current) {
        writeStorage(key, pending.current);
      }
    },
    [key],
  );

  const getSavedDraft = useCallback((): T | null => {
    const raw = readStorage(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }, [key]);

  /** Hides the banner and starts saving. `clear` (the × button) also deletes the old draft. */
  const dismissRestoreBanner = useCallback(
    (clear = true) => {
      if (clear) removeStorage(key);
      enabled.current = true;
      // Let the next change save even if it matches the initial form (e.g. after restoring).
      baseline.current = "";
      setShowRestoreBanner(false);
    },
    [key],
  );

  /** Call after a successful publish or draft save: drops the local draft and any pending write. */
  const flush = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    pending.current = null;
    baseline.current = serialized;
    removeStorage(key);
    setShowRestoreBanner(false);
  }, [key, serialized]);

  return { lastSaved, showRestoreBanner: showRestoreBanner && ready, getSavedDraft, flush, dismissRestoreBanner };
}
