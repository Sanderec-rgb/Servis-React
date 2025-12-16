import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import RestaurantCard from '../components/RestaurantCard';
import { restaurantsService } from '../services/restaurantsService';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [retryCount, setRetryCount] = useState(0);

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

    const loadRestaurants = async (isRetry = false) => {
        try {
            if (!isRetry) setLoading(true);
            setError(null);
            
            const data = await restaurantsService.getRestaurants();
            setRestaurants(data);
            setRetryCount(0); // Resetear contador en éxito
        } catch (err) {
            console.error("Error cargando restaurantes:", err.message || err);
            
            // Mostrar error específico del servicio
            setError(err.message || "No se pudieron cargar los restaurantes.");
            
            // Usar datos de fallback si es error de red
            if (err.message.includes('conexión') || !isOnline) {
                const fallbackData = restaurantsService.getFallbackRestaurants();
                setRestaurants(fallbackData);
                
                // Incrementar contador de reintentos
                if (isRetry) {
                    setRetryCount(prev => prev + 1);
                }
            } else {
                // Para otros errores, mostrar datos de ejemplo
                setRestaurants([
                    {
                        id: 'error-1',
                        name: "Vista Mar (Datos locales)",
                        description: "Información cargada localmente debido a un error en el servidor.",
                        address: "Av. Costera 123, Ciudad",
                        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                        isOffline: true
                    },
                    {
                        id: 'error-2',
                        name: "La Terraza (Modo seguro)",
                        description: "Datos disponibles mientras se soluciona el problema de conexión.",
                        address: "Calle Principal 456, Ciudad",
                        image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                        isOffline: true
                    }
                ]);
            }
        } finally {
            if (!isRetry) setLoading(false);
        }
    };

    // Manejar cambios en la conexión
    const handleOnline = () => {
        console.log('Conexión restablecida');
        setIsOnline(true);
        // Recargar datos automáticamente cuando vuelve la conexión
        if (retryCount > 0) {
            loadRestaurants();
        }
    };

    const handleOffline = () => {
        console.log('Sin conexión a internet');
        setIsOnline(false);
        setError('Estás trabajando sin conexión. Los datos mostrados son de la caché local.');
    };

    useEffect(() => {
        // Cargar datos iniciales
        loadRestaurants();

        // Escuchar cambios en la conexión
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Limpiar event listeners
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Efecto para recargar automáticamente cada 30 segundos en modo error
    useEffect(() => {
        let interval;
        if (error && error.includes('conexión') && retryCount < 3) {
            interval = setInterval(() => {
                console.log('Reintento automático #', retryCount + 1);
                loadRestaurants(true);
            }, 30000); // 30 segundos
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [error, retryCount]);

    const handleRetry = () => {
        loadRestaurants(true);
    };

    return (
        <>
            <Slider slides={homeSlides} />
            
            {/* Banner de estado de conexión */}
            {!isOnline && (
                <div className="connection-banner offline">
                    <i className="fa-solid fa-wifi-slash"></i>
                    <span>Trabajando sin conexión - Modo limitado</span>
                    <button 
                        onClick={handleRetry} 
                        className="small-retry-btn"
                        title="Reintentar conexión"
                    >
                        <i className="fa-solid fa-rotate"></i>
                    </button>
                </div>
            )}
            
            {isOnline && retryCount > 0 && (
                <div className="connection-banner reconnected">
                    <i className="fa-solid fa-wifi"></i>
                    <span>Conexión restablecida - Datos actualizados</span>
                </div>
            )}

            <section className="hero">
                <h1>Encuentre los mejores restaurantes al mejor precio</h1>
                <p>Descubre una amplia selección de restaurantes para todos los gustos y presupuestos</p>
                
                {/* Indicador de estado */}
                <div className="status-indicator">
                    <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
                    <small>{isOnline ? 'Conectado' : 'Sin conexión'}</small>
                    {retryCount > 0 && (
                        <small className="retry-counter">Reintentos: {retryCount}</small>
                    )}
                </div>
            </section>

            <section className="restaurants-section">
                <h2 className="section-title">Nuestros Restaurantes</h2>
                
                {/* Loading State */}
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Cargando restaurantes...</p>
                        {!isOnline && (
                            <small>Intentando reconectar... ({retryCount}/3)</small>
                        )}
                    </div>
                )}
                
                {/* Error State */}
                {error && !loading && (
                    <div className={`error-message ${isOnline ? '' : 'offline-error'}`}>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <p>{error}</p>
                        <div className="error-actions">
                            <button onClick={handleRetry} className="retry-button">
                                <i className="fa-solid fa-rotate"></i> Reintentar
                            </button>
                            {!isOnline && (
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="refresh-button"
                                >
                                    <i className="fa-solid fa-refresh"></i> Recargar página
                                </button>
                            )}
                        </div>
                        
                        {/* Consejo para el usuario */}
                        {error.includes('conexión') && (
                            <div className="connection-tips">
                                <p><strong>Sugerencias:</strong></p>
                                <ul>
                                    <li>Verifica tu conexión WiFi o datos móviles</li>
                                    <li>Reinicia tu router/módem</li>
                                    <li>Desactiva el modo avión</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                
                {/* No Results State */}
                {!loading && !error && restaurants.length === 0 && (
                    <div className="no-results">
                        <i className="fa-solid fa-utensils"></i>
                        <p>No hay restaurantes registrados aún.</p>
                        <button onClick={() => window.location.href = '/new-restaurant'} className="add-first-btn">
                            <i className="fa-solid fa-plus"></i> Agregar primer restaurante
                        </button>
                    </div>
                )}
                
                {/* Success State - Restaurants Grid */}
                {(!loading || restaurants.length > 0) && (
                    <>
                        <div className="restaurants-info">
                            <p className="results-count">
                                Mostrando <strong>{restaurants.length}</strong> restaurante{restaurants.length !== 1 ? 's' : ''}
                                {restaurants.some(r => r.isOffline) && ' (modo offline)'}
                            </p>
                            <button 
                                onClick={() => loadRestaurants(true)} 
                                className="refresh-list-btn"
                                disabled={loading}
                            >
                                <i className="fa-solid fa-arrows-rotate"></i>
                                {loading ? ' Actualizando...' : ' Actualizar lista'}
                            </button>
                        </div>
                        
                        <div className="restaurants-grid">
                            {restaurants.map(restaurant => (
                                <RestaurantCard 
                                    key={restaurant.id} 
                                    restaurant={restaurant}
                                    isOffline={restaurant.isOffline || !isOnline}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default Home;