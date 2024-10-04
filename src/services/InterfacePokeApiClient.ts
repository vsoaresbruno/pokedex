export interface IPokemon {
  name: string
  url: string
}

export interface IPokemonData {
  name: string
  sprites: {
    front_default: string
  }
}
export interface IPokemonList {
  results: IPokemon[]
}
export interface IPokemonDetail {
  name: string
  sprites: {
    front_default: string
  }
  height: number
  weight: number
  stats: {
    name: string
    base_stat: number
  }[]
  types: {
    type: {
      name: string
    }
  }[]
}
