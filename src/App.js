import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { ApolloProvider, useQuery } from '@apollo/client';
import config from './aws-exports';

const { endpoint } = config.aws_cloud_logic_custom[0];

const query = gql`{ hello }`

function App() {
  const { loading, error, data } = useQuery(query);
  if (loading) return <h3>loading...</h3>;
  if (error) {
    console.log({error});
    return <h3>Error...</h3>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{data.hello}</h1>
      </header>
    </div>
  );
}

const client = new ApolloClient({
  uri: endpoint + '/graphql',
  cache: new InMemoryCache()
})

 const AppWithProvider = () => (
   <ApolloProvider client={client}>
     <App />
   </ApolloProvider>
 )

export default AppWithProvider;
