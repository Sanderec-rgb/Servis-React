import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import RestaurantCard from '../components/RestaurantCard';
import { restaurantsService } from '../services/restaurantsService';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const loadAllRestaurants = async () => {
        try {
            setLoading(true);
            const data = await restaurantsService.getRestaurants();
            setAllRestaurants(data);
            setSearchResults(data);
        } catch (err) {
            console.error("Error cargando restaurantes:", err);
            setError("Error al cargar los restaurantes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllRestaurants();
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults(allRestaurants);
            return;
        }

        try {
            setLoading(true);
            const results = await restaurantsService.searchRestaurants(searchQuery);
            setSearchResults(results);
            setError(null);
        } catch (err) {
            console.error("Error buscando:", err);
            // Fallback a búsqueda local
            const normalizedQuery = searchQuery.toLowerCase().trim();
            const localResults = allRestaurants.filter(restaurant => 
                restaurant.name.toLowerCase().includes(normalizedQuery)
            );
            setSearchResults(localResults);
        } finally {
            setLoading(false);
        }
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
                            disabled={loading}
                        />
                        <button 
                            onClick={handleSearch} 
                            className="search-button"
                            disabled={loading}
                        >
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                    
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Buscando restaurantes...</p>
                        </div>
                    ) : (
                        <div className="search-results">
                            <p className="results-count">
                                {searchResults.length} restaurante{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                            </p>
                            
                            <div className="restaurants-grid">
                                {searchResults.length > 0 ? (
                                    searchResults.map(restaurant => (
                                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                                    ))
                                ) : (
                                    <p className="no-results">
                                        No se encontraron restaurantes con "{searchQuery}"
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Search;