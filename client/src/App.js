
import Header from './components/Header';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          /**
           * Merge function to combine existing and incoming data.
           *
           * @param {type} existing - data already present
           * @param {type} incoming - data to be merged
           * @return {type} merged data
           */
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
})

/**
 * Component for rendering the App.
 *
 * @return {JSX.Element} The rendered JSX element
 */
function App() {
  return (
    <> 
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container"> 
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
