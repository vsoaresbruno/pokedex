import React from 'react'
import Pokemons from '@/components/Pokemons'
import { Header } from '@/components/Header'
import { PokemonProvider } from './context/PokemonContext'
import CaughtPokemons from '@components/CaughtPokemons'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Pokemons />} />
            <Route path="/pokedex" element={<CaughtPokemons />} />
          </Routes>
        </div>
      </Router>
    </PokemonProvider>
  )
}

export default App
