import { Link, useLocation } from 'react-router-dom'
import '../css/Header.css'

export const Header = () => {
  const location = useLocation() // Hook para acessar a URL atual
  const isActive = (path: string) => location.pathname === path
  console.log(location.pathname)
  return (
    <nav className="header">
      <ul className="header__list">
        <li
          className={`header__list-item ${isActive('/') ? 'header__list-item--active' : ''}`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`header__list-item ${isActive('/pokedex') ? 'header__list-item--active' : ''}`}
        >
          <Link to="/pokedex">Pokedex</Link>
        </li>
      </ul>
    </nav>
  )
}
