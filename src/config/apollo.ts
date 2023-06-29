import { ApolloClient, InMemoryCache } from '@apollo/client';

const URI = 'https://graphql.anilist.co';

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

export default client;
