export interface IPokemon {
  name: string
  url: string
}

export interface IAllPokemons {
  count: number
  results: IPokemon[]
}

export interface IPokemonData {
  name: string
  sprites: {
    front_default: string
  }
}
export interface IPokemonList {
  results: IPokemon[]
  count: number
}
export interface IPokemonDetail {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  height: number
  weight: number
  stats: {
    name: string
    base_stat: number
    stat: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
  capturedAt?: string
}
