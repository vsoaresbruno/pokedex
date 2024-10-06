import { Link, useLocation } from 'react-router-dom'
import { exportPokemonAsCSV } from '../utils/exportPokemonAsCSV'
import '../css/Header.css'

export const Header = () => {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path
  console.log(location.pathname)
  return (
    <nav className="header">
      <ul className="header__list">
        <li
          className={`header__list-item ${isActive('/') ? 'header__list-item--active' : ''}`}
        >
          <Link to="/" title="Home">
            Home
          </Link>
        </li>
        <li
          className={`header__list-item ${isActive('/pokedex') ? 'header__list-item--active' : ''}`}
        >
          <Link to="/pokedex" title="Pokedex">
            Pokedex
          </Link>
        </li>
      </ul>
      <a
        href="#"
        title="Export Caught Pokémon to CSV"
        onClick={exportPokemonAsCSV}
      >
        Export Caught Pokémon to CSV
      </a>
    </nav>
  )
}
