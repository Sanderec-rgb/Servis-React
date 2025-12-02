import React, { useState } from 'react';
import Slider from '../components/Slider';

const NewRestaurant = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        image: null
    });

    const newRestaurantSlides = [
        {
            title: "¡Agrega tu Restaurante!",
            description: "Forma parte de nuestro exclusivo directorio gastronómico"
        },
        {
            title: "Mayor Visibilidad",
            description: "Llega a miles de clientes potenciales"
        },
        {
            title: "Promociones Especiales",
            description: "Destaca tu restaurante con nuestras ofertas promocionales"
        }
    ];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.image) {
            alert('Por favor, selecciona una imagen para el restaurante');
            return;
        }

        // En una aplicación real, aquí enviarías los datos al servidor
        const imageUrl = URL.createObjectURL(formData.image);
        
        const newRestaurant = {
            id: Date.now(), // ID temporal
            name: formData.name,
            description: formData.description,
            address: formData.address,
            image: imageUrl
        };

        console.log('Nuevo restaurante:', newRestaurant);
        
        alert('Restaurante agregado exitosamente');
        
        // Limpiar formulario
        setFormData({
            name: '',
            description: '',
            address: '',
            image: null
        });

        // Redirigir a la página de inicio
        window.location.href = '/';
    };

    return (
        <>
            <Slider slides={newRestaurantSlides} />
            
            <section className="restaurants-section">
                <h2 className="section-title">Agregar Nuevo Restaurante</h2>
                
                <div className="form-container">
                    <form id="new-restaurant-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Nombre del Restaurante</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="form-input" 
                                value={formData.name}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea 
                                id="description" 
                                className="form-textarea" 
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Dirección</label>
                            <input 
                                type="text" 
                                id="address" 
                                className="form-input" 
                                value={formData.address}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="image" className="form-label">Imagen del Restaurante</label>
                            <input 
                                type="file" 
                                id="image" 
                                className="form-input" 
                                accept="image/*" 
                                onChange={handleFileChange}
                                required 
                            />
                            <small className="form-help">
                                Selecciona una imagen representativa de tu restaurante (JPG, PNG)
                            </small>
                        </div>
                        
                        <button type="submit" className="submit-button">
                            Agregar Restaurante
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default NewRestaurant;