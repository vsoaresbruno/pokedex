import { openDB } from 'idb'
import { IPokemonDetail } from './InterfacePokeApiClient'

const DB_NAME = 'PokemonDB'
const DB_VERSION = 2
const CAUGHT_POKEMON = 'caughtPokemons'
const OFFSET = 'offset'

export const initDB = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(CAUGHT_POKEMON)) {
          db.createObjectStore(CAUGHT_POKEMON, { keyPath: 'name' })
        }
        if (!db.objectStoreNames.contains(OFFSET)) {
          db.createObjectStore(OFFSET, { keyPath: 'currentOffset' })
        }
      },
    })

    return db
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error)
    throw error
  }
}

export const addPokemon = async (pokemon: IPokemonDetail) => {
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
  const allPokemons = await store.getAll()
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

  const pokemon = await store.get(pokemonName)

  if (pokemon) {
    pokemon.note = note
    await store.put(pokemon)
  }

  await tx.done
}

export const saveOffset = async (offset: number) => {
  try {
    const db = await initDB()
    const tx = db.transaction(OFFSET, 'readwrite')
    const store = tx.objectStore(OFFSET)
    await store.put({ key: 'currentOffset', value: offset })
    await tx.done
    console.log('Offset salvo:', offset)
  } catch (error) {
    console.error('Erro ao salvar o offset:', error)
  }
}

export const getOffset = async () => {
  const db = await initDB()
  const tx = db.transaction(OFFSET, 'readonly')
  const store = tx.objectStore(OFFSET)
  const currentOffset = await store.get('currentOffset')
  await tx.done
  return currentOffset?.value || 0
}
