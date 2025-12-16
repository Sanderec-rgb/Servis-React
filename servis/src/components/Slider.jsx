import React from 'react';

const Slider = ({ slides }) => {
    return (
        <div className="slider-container">
            <div className="slider-content">
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider; // <-- Asegúrate de que esta línea esté presente.