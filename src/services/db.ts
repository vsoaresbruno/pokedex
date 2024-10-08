import { openDB } from 'idb'
import { ICaughtPokemons, IPokemons } from '../types/InterfacePokemons'

const DB_NAME = 'PokemonDB'
const DB_VERSION = 2
const CAUGHT_POKEMON = 'caughtPokemons'

export const initDB = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(CAUGHT_POKEMON)) {
          db.createObjectStore(CAUGHT_POKEMON, { keyPath: 'name' })
        }
      },
    })

    return db
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error)
    throw error
  }
}

export const addPokemon = async (pokemon: IPokemons) => {
  const db = await initDB()
  const tx = db.transaction(CAUGHT_POKEMON, 'readwrite')
  const store = tx.objectStore(CAUGHT_POKEMON)
  await store.put(pokemon)
  await tx.done
}

export const getAllPokemons = async () => {
  const db = await initDB()
  const tx = db.transaction(CAUGHT_POKEMON, 'readonly')
  const store = tx.objectStore(CAUGHT_POKEMON)
  const allPokemons: ICaughtPokemons[] = await store.getAll()
  await tx.done
  return allPokemons
}

export const removePokemon = async (pokemonName: string) => {
  const db = await initDB()
  const tx = db.transaction(CAUGHT_POKEMON, 'readwrite')
  const store = tx.objectStore(CAUGHT_POKEMON)
  await store.delete(pokemonName)
  await tx.done
}

export const updatePokemonNote = async (pokemonName: string, note: string) => {
  const db = await initDB()
  const tx = db.transaction(CAUGHT_POKEMON, 'readwrite')
  const store = tx.objectStore(CAUGHT_POKEMON)

  const pokemon: ICaughtPokemons = await store.get(pokemonName)

  if (pokemon) {
    pokemon.pokemonDetails.note = note
    await store.put(pokemon)
  }

  await tx.done
}
