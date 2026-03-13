export function getStoredValue<T extends string>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const value = window.localStorage.getItem(key);

  return (value as T | null) ?? fallback;
}

export function getStoredDocument(key: string, fallback: string): string {
  if (typeof window === 'undefined') {
    return fallback;
  }

  return window.localStorage.getItem(key) ?? fallback;
}

export function setStoredValue(key: string, value: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, value);
}

export function migrateStoredValue(key: string, legacyKey: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const currentValue = window.localStorage.getItem(key);

  if (currentValue !== null) {
    return;
  }

  const legacyValue = window.localStorage.getItem(legacyKey);

  if (legacyValue === null) {
    return;
  }

  window.localStorage.setItem(key, legacyValue);
  window.localStorage.removeItem(legacyKey);
}
