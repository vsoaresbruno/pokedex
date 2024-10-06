import React from 'react'
import Pokemons from '@/components/Pokemons'
import { PokemonProvider } from './context/PokemonContext'
import CaughtPokemons from '@components/CaughtPokemons'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Pokemons />} />
            <Route path="/caught" element={<CaughtPokemons />} />
          </Routes>
        </div>
      </Router>
    </PokemonProvider>
  )
}

export default App
