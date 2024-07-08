import { useState } from 'react';
import { UserColors } from "@/types";

export function useColorStorage (key: string, initialValue: UserColors){
  const getLocalStorage = (): UserColors => {
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
  const [localData, setLocalData] = useState<UserColors >(() => getLocalStorage());

  const setLocalStorage = (newValue: UserColors): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setLocalData(newValue);
    } catch (e) {
      setLocalData(initialValue);
    }
  }

  return {localData, setLocalStorage, getLocalStorage};
}
