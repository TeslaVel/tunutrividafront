import { createContext, useState, PropsWithChildren } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { useColorStorage } from '@/hooks/useColorStorage';
import { colorByGender } from '@/components/utils/GeneralUtils'

// types
import { UserType, UserColors, Colors } from "@/types";

const initialState: {
  userStored: UserType | null;
  storeUser: (value: UserType) => void;
  deleteUserStored: () => void;
  userColors: UserColors | null
} = {
  userStored: null,
  storeUser: (value: UserType) => {},
  deleteUserStored: () => {},
  userColors: null
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
  const {localData: userColors, setLocalStorage: setUserColors} = useColorStorage('ntv-uc-tk', colorByGender(userData?.gender))

  const setUserToken = (user: UserType) => {
    setStorage(user)
    updateMainStatusLogin()

    const genderColor: UserColors = colorByGender(user.gender)
    setUserColors(genderColor)
  }

  const deleteUserToken = () => {
    setStorage(null)
  }

  const value = {
    userStored: userData || null,
    storeUser: (user: UserType) => setUserToken(user),
    deleteUserStored: () => deleteUserToken(),
    userColors: userColors
  };
  // console.log('AuthProvider recover token', value);
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
