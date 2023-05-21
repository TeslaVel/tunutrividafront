import React, { createContext, PropsWithChildren } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { UserType} from "@/shared/types";

const initialState: {
  userStored: UserType | null;
  storeUser: (value: UserType) => void;
  deleteUserStored: () => void;
} = {
  userStored: null,
  storeUser: (value: UserType) => {},
  deleteUserStored: () => {}
};

type IProps = {
};

// used as hook params
export const AuthContext = createContext(initialState);

// used on routes
export const AuthProvider = ({children}: PropsWithChildren<IProps>) => {
  const {userData, setStorage} = useStorage('pgus-tk', null)

  const setUserToken = (user: UserType) => {
    setStorage(user)
  }

  const deleteUserToken = () => {
    setStorage(null)
  }

  const value = {
    userStored: userData || null,
    storeUser: (user: UserType) => setUserToken(user),
    deleteUserStored: () => deleteUserToken()
  };
  // console.log('AuthProvider recover token', value);
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
