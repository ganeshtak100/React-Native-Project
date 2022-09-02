/**
 * @format
 */
// import {InMemoryCache} from '@apollo/client';
// import {ApolloProvider} from '@apollo/react-hooks';
// import {InMemoryCache} from 'apollo-cache-inmemory';
// import {ApolloClient} from 'apollo-client';
// import {ApolloLink} from 'apollo-link';
// import {HttpLink} from 'apollo-link-http';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {AppRegistry} from 'react-native';
import makeApolloClient from './apollo';
import {App} from './App';
import {name as appName} from './app.json';
// Create the client as outlined in the setup guide
// const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql',
//   cache: new InMemoryCache(),
// });

const Appp = () => {
  return (
    <ApolloProvider client={makeApolloClient}>
      <App />
    </ApolloProvider>
  );
};

// AppRegistry.registerComponent('MyApplication', () => App);

AppRegistry.registerComponent(appName, () => Appp);
