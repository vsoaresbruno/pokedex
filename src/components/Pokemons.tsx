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
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'error' && <p>Ocorreu um erro ao carregar os dados</p>}
      {status === 'success' && (
        <div>
          <PokemonList
            pokemonList={pokemonList}
            handleIsCaught={handleIsCaught}
            handleCatch={handleCatch}
          />

          <div
            ref={loadMoreRef}
            style={{ height: '20px', background: 'transparent' }}
          />
          {isFetchingNextPage && <p>Carregando mais...</p>}
        </div>
      )}
    </div>
  )
}
