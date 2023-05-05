import React, { createContext, PropsWithChildren } from 'react';
import { useStorage } from '@/hooks/useStorage';

const initialState: {
  userToken: string | null;
  storeToken: (value: string) => void;
  deleteToken: () => void;
} = {
  userToken: '',
  storeToken: (tk: string) => {},
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
  const {token, setStorage} = useStorage('pgus-tk', null)

   const setUserToken = (tk: string) => {
    console.log('desde el authprovider setUserToken')
    setMainToken(tk)
    setStorage(tk)
  }

  const deleteUserToken = () => {
    console.log('desde el authprovider deleteUserToken')
    removeMainToken()
    setStorage(null)
  }

  const value = {
    userToken: token,
    storeToken: (tk: string) => setUserToken(tk),
    deleteToken: () => deleteUserToken()
  };
  // console.log('AuthProvider recover token', value);
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
