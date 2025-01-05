'use client'

import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../../apollo-client';
import { ReactNode } from 'react';

const ApolloProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={createApolloClient()}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;