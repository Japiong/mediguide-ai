'use client';
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored));
    } catch {}
  }, [key]);

  const set = (val) => {
    try {
      const next = val instanceof Function ? val(value) : val;
      setValue(next);
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  };

  return [value, set];
}
