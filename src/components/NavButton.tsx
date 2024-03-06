import React, { useState } from 'react'; 
import { Link, useLocation } from 'react-router-dom'; 
import './NavButton.css'; 

const NavButton: React.FC = () => {
    const [menuActive, setMenuActive] = useState(false);
    const location = useLocation(); 

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const isActiveLink = (path: string) => location.pathname === path;

    const renderNavLink = (path: string, text: string) => (
        <li>
            <Link
                to={path}
                onClick={toggleMenu}
                className={isActiveLink(path) ? 'activeLink' : ''}
            >
                {text}
            </Link>
        </li>
    );

    const headerClass = menuActive ? 'header active' : 'header';
    const menuClass = menuActive ? 'menu active' : 'menu';

    return (
        <header className={headerClass}>
            <div className="containerMenu">
                <div className="menu-btn" onClick={toggleMenu} aria-label="Toggle menu" role="button" tabIndex={0}>
                    <div className={`btn-line ${menuActive ? 'first' : ''}`}></div>
                    <div className={`btn-line ${menuActive ? 'second' : ''}`}></div>
                    <div className={`btn-line ${menuActive ? 'third' : ''}`}></div>
                </div>
                <nav className={menuClass} aria-expanded={menuActive} aria-label="Main menu">
                    <ul>
                        {renderNavLink('/menu', 'Meny')}
                        <div className='spacer'></div>
                        {renderNavLink('/about', 'Vårt Kaffe')}
                        <div className='spacer'></div>
                        {renderNavLink('/profile', 'Min profil')}
                        <div className='spacer'></div>
                        {renderNavLink('/status', 'Orderstatus')}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavButton; 