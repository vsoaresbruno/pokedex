export interface Pokemon {
  name: string
  url: string
}

export interface PokemonData {
  name: string
  sprites: {
    front_default: string
  }
}
export interface PokemonList {
  results: Pokemon[]
}

export interface PokemonDetail {
  name: string
  sprites: {
    front_default: string
  }
}
