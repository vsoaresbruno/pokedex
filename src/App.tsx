import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Header } from '@/components/Header'
import { Pokemons } from '@/components/Pokemons'
import { CaughtPokemons } from '@components/CaughtPokemons'
import { PokemonProvider } from './context/PokemonContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
