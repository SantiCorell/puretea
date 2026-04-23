"use client";

const DEBUG_KEY = "puretea_checkout_debug_logs";
const DEBUG_LIMIT = 200;

type DebugEntry = {
  ts: string;
  scope: string;
  payload: Record<string, unknown>;
};

declare global {
  interface Window {
    __pureteaCheckoutLogs?: DebugEntry[];
  }
}

function readExisting(): DebugEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DEBUG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DebugEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(entries: DebugEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DEBUG_KEY, JSON.stringify(entries.slice(-DEBUG_LIMIT)));
  } catch {
    // ignore localStorage quota errors in debug mode
  }
}

export function persistCheckoutDebug(scope: string, payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const entry: DebugEntry = {
    ts: new Date().toISOString(),
    scope,
    payload,
  };
  const current = window.__pureteaCheckoutLogs ?? readExisting();
  const updated = [...current, entry].slice(-DEBUG_LIMIT);
  window.__pureteaCheckoutLogs = updated;
  write(updated);
}

export function clearCheckoutDebug(): void {
  if (typeof window === "undefined") return;
  window.__pureteaCheckoutLogs = [];
  window.localStorage.removeItem(DEBUG_KEY);
}
