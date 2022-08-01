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
// added in for development - REMOVE TO DEPLOY
import Single from './pages/Single';

const PORT = process.env.PORT || 3001;

let graphqlPath = `http://localhost:${PORT}/graphql`;

if (process.env.NODE_ENV === 'production') {
  graphqlPath = '/graphql';
}

const httpLink = createHttpLink({
  uri: graphqlPath,
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
            {/* added in for development - REMOVE FOR DEPLOYMENT */}
            {/* <Route exact path="/single" component={Single} /> */}
          </Switch>
        </>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
