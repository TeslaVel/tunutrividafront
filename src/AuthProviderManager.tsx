import { createContext, useState, PropsWithChildren } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { useColorStorage } from '@/hooks/useColorStorage';
import { colorByGender } from '@/components/utils/GeneralUtils'

// types
import { UserType, ThemeType } from "@/types";

const initialState: {
  userStored: UserType | null;
  storeUser: (value: UserType) => void;
  deleteUserStored: () => void;
  theme: ThemeType | null
} = {
  userStored: null,
  storeUser: (value: UserType) => {},
  deleteUserStored: () => {},
  theme: null
};

type Props = {
  children: JSX.Element
  updateMainStatusLogin: () => void
}

// used as hook params
export const AuthContext = createContext(initialState);

// used on routes
export const AuthProvider: React.FC<Props> = ({children, updateMainStatusLogin}: PropsWithChildren<Props>) => {
  const {userData, setStorage} = useStorage('pgus-tk', null)
  const {localData: theme, setLocalStorage: setThemeColor} = useColorStorage('ntv-uc-tk', colorByGender(userData?.gender))

  const setUserToken = (user: UserType) => {
    setStorage(user)
    updateMainStatusLogin()

    const genderColor: ThemeType = colorByGender(user.gender)
    setThemeColor(genderColor)
  }

  const deleteUserToken = () => {
    setStorage(null)
  }

  const value = {
    userStored: userData || null,
    storeUser: (user: UserType) => setUserToken(user),
    deleteUserStored: () => deleteUserToken(),
    theme: theme
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
