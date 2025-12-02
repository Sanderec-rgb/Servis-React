import React from 'react';

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
            <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="restaurant-image"
                onError={(e) => {
                    e.target.src = '/img/placeholder.jpg';
                }}
            />
            <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-description">{restaurant.description}</p>
                <div className="restaurant-address">
                    <i className="fa-solid fa-map-location-dot"></i> {restaurant.address}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;