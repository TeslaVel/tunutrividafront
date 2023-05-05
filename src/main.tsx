import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloProvider } from '@apollo/client'
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    deleteAndRedirect();
  };
});

const deleteAndRedirect = () => {
  window.localStorage.removeItem('pgus-tk');
  window.location.href = '/';
}

const AppWrapper = () => {
  const [token, setToken] = useState<string | null>(null);
  const [client, setClient] = useState(() => {
    const auth = token ? {authorization: `Bearer ${token}`} : {authorization: ''};
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, new HttpLink({
        uri: 'http://localhost:3000/graphql',
        headers: auth
      })])
    });
  });

  useEffect(() => {
    const auth = token ? {authorization: `Bearer ${token}`} : {authorization: ''};
    setClient(new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, new HttpLink({
        uri: 'http://localhost:3000/graphql',
        headers: auth
      })])
    }));
  }, [token]);

  const handleLogin = (newToken: string) => {
    console.log('desde el main handleLogin', newToken)
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App setMainToken={handleLogin} removeMainToken={handleLogout}/>
      </ApolloProvider>
    </React.StrictMode>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<AppWrapper />);

