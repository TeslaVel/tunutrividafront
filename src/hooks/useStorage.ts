import { useState } from 'react';
import { UserType } from "@/types";

export function useStorage (key: string, initialValue: null){
  const getStorage = (): UserType | null => {
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
  const [userData, setUser] = useState<UserType | null>(() => getStorage());

  const setStorage = (newValue: UserType | null): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setUser(newValue);
    } catch (e) {
      setUser(initialValue);
    }
  }

  return {userData, setStorage, getStorage};
}
