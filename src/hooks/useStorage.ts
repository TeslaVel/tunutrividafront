import { useState } from 'react';
import { FullUserType } from "@/types";

export function useStorage (key: string, initialValue: null){
  const getStorage = (): FullUserType | null => {
    let val = null;
    try {
      const item = window.localStorage.getItem(key);
      val = item !== null ? JSON.parse(item) : initialValue;
      return val;
    } catch (e) {
      val = null;
    }
    return val
  }
  const [userData, setUser] = useState<FullUserType | null>(() => getStorage());

  const setStorage = (newValue: FullUserType | null): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setUser(newValue);
    } catch (e) {
      setUser(initialValue);
    }
  }

  return {userData, setStorage, getStorage};
}
