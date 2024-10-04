import React from 'react'
import Pokemons from '@/components/Pokemons'
import CaughtPokemons from '@components/CaughtPokemons'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/caught" element={<CaughtPokemons />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
