
import Header from './components/Header';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import Clients from './components/Clients';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
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
        <Header />
        <div className="container"> 
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
