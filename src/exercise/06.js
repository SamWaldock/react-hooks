// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
import { PokemonDataView, PokemonForm, PokemonInfoFallback, fetchPokemon } from '../pokemon';
import { ErrorBoundary } from 'react-error-boundary';

const PokemonInfo = ({ pokemonName }) => {
  const [state, setState] = React.useState({ status: 'idle', pokemon: null, error: null });
  const { status, pokemon, error } = state;

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({status: 'pending'});
    
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({status: 'resolved', pokemon});
      })
      .catch(error => {
        setState({status: 'rejected', error});
      })
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  return null;
}

const ErrorFallback = ({error}) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

const App = () => {
  const [pokemonName, setPokemonName] = React.useState('')

  const handleSubmit = (newPokemonName) => {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
