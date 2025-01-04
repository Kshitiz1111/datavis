import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { onError } from '@apollo/client/link/error'


const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});


const link: ApolloLink = ApolloLink.from([
  errorLink,
  new HttpLink({ uri: 'https://countries.trevorblades.com/graphql' }),
]);


const createApolloClient = (): ApolloClient<any> => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
