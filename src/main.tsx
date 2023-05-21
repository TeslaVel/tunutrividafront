import React, { useState, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import { AuthContext } from '@/AuthProviderManager'
import { useStorage } from '@/hooks/useStorage';
import './index.css'

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloProvider } from '@apollo/client'
import { onError } from "@apollo/client/link/error";

const BASE_URL = 'http://localhost:3001/graphql';

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
});

const deleteAndRedirect = () => {
  window.localStorage.removeItem('pgus-tk');
  window.location.href = '/';
}

const AppWrapper = () => {
  const { userData } = useStorage('pgus-tk', null)
  const [client, setClient] = useState(() => {
    const auth = userData?.token ? {authorization: `Bearer ${userData?.token}`} : {authorization: ''};
    console.log('auth new', auth)
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, new HttpLink({
        uri: BASE_URL,
        headers: auth
      })])
    });
  });

  useEffect(() => {
    const auth = userData?.token ? {authorization: `Bearer ${userData?.token}`} : {authorization: ''};
    console.log('auth useEffect', auth)
    setClient(new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, new HttpLink({
        uri: BASE_URL,
        headers: auth
      })])
    }));
  }, [userData?.token]);

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </React.StrictMode>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<AppWrapper />);

