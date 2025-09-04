import {NavLink} from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <nav>
                <NavLink to="/">Buscar</NavLink>
                <NavLink to="/favorites">Favoritos</NavLink>
            </nav>
        </header>
    )
}

export default Header
