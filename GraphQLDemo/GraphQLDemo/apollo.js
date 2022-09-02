import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';

const makeApolloClient = () => {
  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: `http://localhost:5000/graphql`,
  });

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
};

export default makeApolloClient;
