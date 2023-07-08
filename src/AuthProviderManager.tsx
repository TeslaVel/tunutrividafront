import { createContext, useState, PropsWithChildren } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { useGeneralStorage } from '@/hooks/useGeneralStorage';
import { UserType, UserColors } from "@/types";

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

interface IProps {
  updateMainStatusLogin: () => void
}

// used as hook params
export const AuthContext = createContext(initialState);

// used on routes
export const AuthProvider = ({children, updateMainStatusLogin}: PropsWithChildren<IProps>) => {
  const {userData, setStorage} = useStorage('pgus-tk', null)
  const {localData: userColors, setLocalStorage: setUserColors} = useGeneralStorage('ntv-uc-tk', null)

  const setUserToken = (user: UserType) => {
    setStorage(user)
    updateMainStatusLogin()

    const genderColor = user.gender === 'male'
      ? {
        bgGraphColor: 'bg-gray-blue-05',
        itemSelected: 'bg-gray-blue-20',
        buttonBgColor: 'bg-gray-blue-50 hover:bg-gray-blue-100 text-dark-blue-700'
      }
      : {
        bgGraphColor: 'bg-purple-01',
        itemSelected: 'bg-purple-15',
        buttonBgColor: 'bg-purple-15 hover:bg-purple-50'
      }
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
