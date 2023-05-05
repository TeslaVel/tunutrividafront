import { useState } from 'react';

export function useStorage (key: string, initialValue: null){
  const getStorage = (): string | null => {
    // console.log('buscando token del storage')
    let val = null;
    try {
      const item = window.localStorage.getItem(key);
      val = item !== null ? JSON.parse(item) : initialValue;
      // console.log('retornar encontrado  del storage', val)
      return val;
    } catch (e) {
      val = null;
    }
    return val
  }
  const [token, setToken] = useState<string | null>(() => getStorage());

  const setStorage = (newValue: string | null): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      setToken(newValue);
    } catch (e) {
      setToken(initialValue);
    }
  }

  return {token, setStorage};
}
