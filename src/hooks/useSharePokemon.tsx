interface ISharePokemon {
  name: string
  pokemonDetails: {
    id: number
    sprites: {
      front_default: string
    }
  }
}
export const useSharePokemon = (pokemon: ISharePokemon) => {
  const generatePokemonMessage = (pokemon: ISharePokemon) => {
    const { name, pokemonDetails } = pokemon

    const message = `I caught \n\n#${pokemonDetails.id} - ${name}\n! check out!`
    const imageLink = pokemonDetails.sprites.front_default

    return `${message}\n${imageLink}`
  }

  const generateWhatsappLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/?text=${encodedMessage}`
  }

  const handleShare = () => {
    const message = generatePokemonMessage(pokemon)
    const whatsappLink = generateWhatsappLink(message)

    window.open(whatsappLink, '_blank')
  }

  return { handleShare }
}
