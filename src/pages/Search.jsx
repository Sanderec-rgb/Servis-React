import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchSlides = [
        {
            title: "¡Encuentra tu restaurante ideal!",
            description: "Busca por nombre y descubre los mejores lugares para comer"
        },
        {
            title: "Búsqueda Avanzada",
            description: "Filtra por tipo de cocina, precio y ubicación"
        },
        {
            title: "Recomendaciones Personalizadas",
            description: "Descubre restaurantes basados en tus preferencias"
        }
    ];

    useEffect(() => {
        setSearchResults(restaurants);
    }, []);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults(restaurants);
            return;
        }

        const normalizedQuery = searchQuery.toLowerCase().trim();
        const results = restaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(normalizedQuery)
        );
        
        setSearchResults(results);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <Slider slides={searchSlides} />
            
            <section className="restaurants-section">
                <h2 className="section-title">Buscar Restaurantes</h2>
                
                <div className="search-section">
                    <div className="search-container">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="search-input" 
                            placeholder="Buscar por nombre..." 
                        />
                        <button onClick={handleSearch} className="search-button">
                            Buscar
                        </button>
                    </div>
                    
                    <div className="restaurants-grid">
                        {searchResults.length > 0 ? (
                            searchResults.map(restaurant => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                            ))
                        ) : (
                            <p className="no-results">No se encontraron restaurantes</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;