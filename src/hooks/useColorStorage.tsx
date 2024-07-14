import { useState } from 'react';
import { ThemeType } from "@/types";

export function useColorStorage (key: string, initialValue: ThemeType){
  const getLocalStorage = (): ThemeType => {
    let val = null;
    try {
      const item = window.localStorage.getItem(key);
      val = item !== null ? JSON.parse(item) : initialValue;

      return val;
    } catch (e) {
      val = null;
    }
    return initialValue
  }
  const [localData, setLocalData] = useState<ThemeType >(() => getLocalStorage());

  const setLocalStorage = (newValue: ThemeType): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setLocalData(newValue);
    } catch (e) {
      setLocalData(initialValue);
    }
  }

  return {localData, setLocalStorage, getLocalStorage};
}
