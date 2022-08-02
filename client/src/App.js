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
import Main from './pages/Main';
import SavedNewsPage from './pages/SavedNewsPage/SavedNewsPage';
import Navbar from './components/Navbar';
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

//*** Setup global state to share artical id between Main and Single ***
// const defaultGlobalState = {
//   article_id: '',
// };

// const globalStateContext = React.createContext(defaultGlobalState);
// const dispatchStateContext = React.createContext(undefined);

// const GlobalStateProvider = ({ children }) => {
//   const [state, dispatch] = React.useReducer(
//     (state, newValue) => ({ ...state, ...newValue }),
//     defaultGlobalState
//   );
//   return (
//     <globalStateContext.Provider value={state}>
//       <dispatchStateContext.Provider value={dispatch}>
//         {children}
//       </dispatchStateContext.Provider>
//     </globalStateContext.Provider>
//   );
// };

// export const useGlobalState = () => [
//   React.useContext(globalStateContext),
//   React.useContext(dispatchStateContext),
// ];

//*** End global state config ***
function App() {
  return (
    // <GlobalStateProvider>
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/browse" component={Browsing} />
            <Route exact path="/single" component={Single} />
            <Route exact path="/saved" component={SavedNewsPage} />
            <Route exact path="/" component={Main} />
          </Switch>
        </>
        <Footer />
      </Router>
    </ApolloProvider>
    // </GlobalStateProvider>
  );
}

export default App;
