import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';

const Home = () => {
    const [displayedRestaurants, setDisplayedRestaurants] = useState([]);

    const homeSlides = [
        {
            title: "¡Nuevos Restaurantes Agregados!",
            description: "Descubre las últimas incorporaciones a nuestro directorio gastronómico"
        },
        {
            title: "Ofertas Especiales",
            description: "Descuentos exclusivos en restaurantes seleccionados por tiempo limitado"
        },
        {
            title: "Eventos Gastronómicos",
            description: "No te pierdas los festivales y eventos culinarios de este mes"
        }
    ];

    useEffect(() => {
        setDisplayedRestaurants(restaurants);
    }, []);

    return (
        <>
            <Slider slides={homeSlides} />
            
            <section className="hero">
                <h1>Encuentre los mejores restaurantes al mejor precio</h1>
                <p>Descubre una amplia selección de restaurantes para todos los gustos y presupuestos</p>
            </section>

            <section className="restaurants-section">
                <h2 className="section-title">Nuestros Restaurantes</h2>
                <div className="restaurants-grid">
                    {displayedRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;