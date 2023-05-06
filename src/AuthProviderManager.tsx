import React, { createContext, PropsWithChildren } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { UserType} from "@/shared/types";

const initialState: {
  userToken: UserType | null;
  storeToken: (value: UserType) => void;
  deleteToken: () => void;
} = {
  userToken: null,
  storeToken: (value: UserType) => {},
  deleteToken: () => {}
};

type IProps = {
  setMainToken: (value: string) => void;
  removeMainToken: () => void;
};

// used as hook params
export const AuthContext = createContext(initialState);

// used on routes
export const AuthProvider = ({setMainToken , removeMainToken, children}: PropsWithChildren<IProps>) => {
  const {userData, setStorage} = useStorage('pgus-tk', null)

   const setUserToken = (user: {token: string, email: string, first_name: string, last_name: string}) => {
    console.log('desde el authprovider setUserToken')
    setMainToken(user.token)
    setStorage(user)
  }

  const deleteUserToken = () => {
    console.log('desde el authprovider deleteUserToken')
    removeMainToken()
    setStorage(null)
  }

  const value = {
    userToken: userData || null,
    storeToken: (user: UserType) => setUserToken(user),
    deleteToken: () => deleteUserToken()
  };
  // console.log('AuthProvider recover token', value);
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
