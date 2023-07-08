import { useState } from 'react';
import { UserColors } from "@/types";

export function useGeneralStorage (key: string, initialValue: null){
  const getLocalStorage = (): UserColors | null => {
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
  const [localData, setLocalData] = useState<UserColors | null>(() => getLocalStorage());

  const setLocalStorage = (newValue: UserColors | null): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setLocalData(newValue);
    } catch (e) {
      setLocalData(initialValue);
    }
  }

  return {localData, setLocalStorage, getLocalStorage};
}
