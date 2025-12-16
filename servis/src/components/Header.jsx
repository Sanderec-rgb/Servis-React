import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header>
            <div className="top-bar">
                <div className="logo">Servis<i className="fa-solid fa-martini-glass-citrus"></i></div>
                
                <div className="user-actions">
                    <button><i className="fa-regular fa-circle-user"></i></button>
                    <button><i className="fa-solid fa-gear"></i></button>
                </div>
                
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    <i className="fa-solid fa-list"></i>
                </button>
            </div>
            
            <nav className={isMenuOpen ? 'active' : ''}>
                <div className="nav-links">
                    <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
                        Inicio
                    </Link>
                    <Link to="/search" className={isActive('/search')} onClick={() => setIsMenuOpen(false)}>
                        Búsqueda
                    </Link>
                    <Link to="/new-restaurant" className={isActive('/new-restaurant')} onClick={() => setIsMenuOpen(false)}>
                        Nuevo Restaurante
                    </Link>
                </div>
            </nav>
        </header>
    );
};

// ⚠️¡¡¡¡ESTA LÍNEA ES CRÍTICA!!!!⚠️
export default Header;