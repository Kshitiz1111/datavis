'use client'

import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../../apollo-client';

const ApolloProviderWrapper = ({ children }: { children: any }) => {
  return (
    <ApolloProvider client={createApolloClient()}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;