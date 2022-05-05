import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Cookie from 'js-cookie'

const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('user');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ''
    }
  };
});

const httpLink = createHttpLink({
    uri: 'https://hnserver.herokuapp.com/'
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;