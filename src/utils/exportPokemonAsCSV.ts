import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { initDB } from '../services/db'

const STORE_NAME = 'caughtPokemons'

export const exportPokemonAsCSV = async () => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const allPokemons = await store.getAll()
  await tx.done

  if (allPokemons.length === 0) {
    alert('There are no caught Pokémon to export.')
    return
  }

  const csvRows = [
    'ID, Name, Type, Height, Weight, HP, Attack, Defense, Special Attack, Special Defense, Speed, Captured At',
  ]

  allPokemons.forEach((pokemon: IPokemonDetail) => {
    const { id, name, capturedAt, types, height, weight, stats } = pokemon

    const statsValues: Record<string, number> = {}
    stats.forEach((stat: { stat: { name: string }; base_stat: number }) => {
      statsValues[stat.stat.name] = stat.base_stat
    })

    const typesValues: string[] = []
    types.forEach((type: { type: { name: string } }) => {
      typesValues.push(type.type.name)
    })

    const typeToString = typesValues.join('/')

    csvRows.push(
      `${id}, ${name}, ${typeToString}, ${height / 10}m, ${weight / 10}kg, ${statsValues.hp || 0}, ${statsValues.attack || 0}, ${statsValues.defense || 0}, ${statsValues['special-attack'] || 0}, ${statsValues['special-defense'] || 0}, ${statsValues.speed || 0}, ${capturedAt}`
    )
  })

  const csvContent = csvRows.join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'caught_pokemons.csv'
  a.click()

  URL.revokeObjectURL(url)
}
