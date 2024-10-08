import { PokemonList } from './PokemonList'
import { usePokemons } from '../hooks/usePokemons'

export const Pokemons = () => {
  const {
    handleIsCaught,
    handleCatch,
    status,
    pokemonList,
    loadMoreRef,
    isFetchingNextPage,
  } = usePokemons()

  return (
    <div>
      <h1>Pokémons List</h1>
      {status === 'loading' && <p>Loading Pokémons..</p>}
      {status === 'error' && <p>Error to load Pokémons</p>}
      {status === 'success' && (
        <div>
          <PokemonList
            pokemonList={pokemonList}
            handleIsCaught={handleIsCaught}
            handleCatch={handleCatch}
          />

          <div ref={loadMoreRef} />
          {isFetchingNextPage && <p>Loading more Pokémons</p>}
        </div>
      )}
    </div>
  )
}
