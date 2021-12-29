import { isMobile } from 'react-device-detect';
import Mobile from './mobile'
import Website from './website'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import './App.css';

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      {(isMobile)? <Mobile /> : <Website />}
    </ApolloProvider>
  )
}

export default App;
