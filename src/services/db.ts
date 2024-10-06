import { openDB } from 'idb'
import { IPokemonDetail } from './InterfacePokeApiClient'

const DB_NAME = 'PokemonDB'
const STORE_NAME = 'caughtPokemons'

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'name',
        })
      }
    },
  })
}

export const addPokemon = async (pokemon: IPokemonDetail) => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  await store.put(pokemon)
  await tx.done
}

export const getAllPokemons = async () => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const allPokemons = await store.getAll()
  await tx.done
  return allPokemons
}

export const removePokemon = async (pokemonName: string) => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  await store.delete(pokemonName)
  await tx.done
}
