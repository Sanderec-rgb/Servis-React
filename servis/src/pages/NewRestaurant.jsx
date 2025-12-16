import React, { useState } from 'react';
import Slider from '../components/Slider';
import { restaurantsService } from '../services/restaurantsService';

const NewRestaurant = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        imageFile: null,
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                imageFile: file,
                imageUrl: URL.createObjectURL(file) // Vista previa local
            }));
        }
    };

    const handleUrlChange = (e) => {
        setFormData(prev => ({
            ...prev,
            imageUrl: e.target.value,
            imageFile: null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.description.trim() || !formData.address.trim()) {
            setError('Por favor, completa todos los campos obligatorios');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await restaurantsService.addRestaurant({
                name: formData.name,
                description: formData.description,
                address: formData.address,
                image: formData.imageUrl // URL o cadena vacía
            }, formData.imageFile);

            setSuccess(true);

            // Limpiar formulario después de 2 segundos
            setTimeout(() => {
                setFormData({
                    name: '',
                    description: '',
                    address: '',
                    imageFile: null,
                    imageUrl: ''
                });
                setSuccess(false);
                window.location.href = '/';
            }, 2000);

        } catch (err) {
            console.error("Error agregando restaurante:", err);
            setError('Error al agregar el restaurante. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Slider slides={newRestaurantSlides} />

            <section className="restaurants-section">
                <h2 className="section-title">Agregar Nuevo Restaurante</h2>

                <div className="form-container">
                    <form id="new-restaurant-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Nombre del Restaurante *
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="form-label">
                                Descripción *
                            </label>
                            <textarea
                                id="description"
                                className="form-textarea"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address" className="form-label">
                                Dirección *
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="form-input"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Imagen del Restaurante</label>

                            <div className="image-options">
                                <div className="option">
                                    <label htmlFor="imageFile" className="option-label">
                                        Subir archivo
                                    </label>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        className="form-input-file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="option">
                                    <label htmlFor="imageUrl" className="option-label">
                                        O usar URL
                                    </label>
                                    <input
                                        type="text"
                                        id="imageUrl"
                                        className="form-input"
                                        value={formData.imageUrl}
                                        onChange={handleUrlChange}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {formData.imageUrl && (
                                <div className="image-preview">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Vista previa"
                                        className="preview-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'block';
                                        }}
                                    />
                                    <p className="preview-error" style={{display: 'none'}}>
                                        No se puede cargar la imagen
                                    </p>
                                </div>
                            )}

                            <small className="form-help">
                                Sube una imagen o ingresa una URL. Recomendado: 800x600px
                            </small>
                        </div>

                        {loading && (
                            <div className="loading-overlay">
                                <div className="spinner-small"></div>
                                <p>Guardando restaurante...</p>
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="success-message">
                                <p>✅ Restaurante agregado exitosamente. Redirigiendo...</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Agregar Restaurante'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default NewRestaurant;
