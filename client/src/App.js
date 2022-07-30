import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Footer from './components/Footer';
import Browsing from './pages/Browsing';
import Navbar from './components/Navbar';

const PORT = process.env.PORT || 3001;

const uri = `http://localhost:${PORT}/graphql`;

console.log('GraphQL uri: ' + uri);

const httpLink = createHttpLink({
  uri: uri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/browse" component={Browsing} />
          </Switch>
        </>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
