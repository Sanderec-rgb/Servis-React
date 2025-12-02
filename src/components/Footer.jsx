import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/search">Búsqueda</Link></li>
                        <li><Link to="/new-restaurant">Nuevo Restaurante</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Información</h3>
                    <ul>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Sobre Nosotros</a></li>
                        <li><a href="#">Nuestra Historia</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Contacto</h3>
                    <ul>
                        <li><a href="#">Nuestros Socios</a></li>
                        <li><a href="#">Contáctanos</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Síguenos</h3>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-x-twitter"></i></a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                &copy; 2025 Servis. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;