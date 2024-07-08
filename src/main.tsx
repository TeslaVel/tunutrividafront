import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { useStorage } from '@/hooks/useStorage';
import './index.css'

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloProvider } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client';
import { onError } from "@apollo/client/link/error";

const VITE_GRAPHQ_SERVER = import.meta.env.VITE_APP_GRAPH_SERVER

const deleteUploadCookie = () => window.localStorage.removeItem('upldtkTnvD');

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // deleteAndRedirect();
  };

  deleteUploadCookie();
});

const deleteAndRedirect = () => {
  window.localStorage.removeItem('pgus-tk');
  window.location.href = '/';
}

const AppWrapper = () => {
  const item = window.localStorage.getItem('upldtkTnvD');
  const isSetted = item !== null ? JSON.parse(item) : null;

  const { userData, getStorage } = useStorage('pgus-tk', null)
  const [client, setClient] = useState(() => {
    const auth = userData?.token ? {authorization: `Bearer ${userData?.token}`} : {authorization: ''};

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, new HttpLink({ uri: VITE_GRAPHQ_SERVER, headers: auth })])
    });
  });

  const asignClientAfterLogin = () => {
    const userTokenData = getStorage()
    const auth = userTokenData?.token ? {authorization: `Bearer ${userTokenData?.token}`} : {authorization: ''};
    setClient(new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, new HttpLink({ uri: VITE_GRAPHQ_SERVER, headers: auth })])
    }));
  }

  const asignCLientForUploadImage = () => {
    if (isSetted) {
      const userTokenData = getStorage()
      const auth = userTokenData?.token ? {authorization: `Bearer ${userTokenData?.token}`} : {authorization: ''};
      const link = createUploadLink({
        uri: VITE_GRAPHQ_SERVER,
        headers: auth,
        credentials: 'include'
      })

      setClient(new ApolloClient({
        cache: new InMemoryCache(),
        link: from([errorLink, link])
      }));
    } else {
      deleteUploadCookie()
      asignClientAfterLogin()
    }
  }

  useEffect(() => {
    asignClientAfterLogin()
  }, [userData?.token]);

  const updateMainStatusLogin = () => {
    asignClientAfterLogin()
  };

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App
          updateMainStatusLogin={updateMainStatusLogin}
          asignCLientForUploadImage={asignCLientForUploadImage}/>
      </ApolloProvider>
    </React.StrictMode>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<AppWrapper />);

