import React, { useState } from 'react';
import './TrackOrder.css';

const TrackOrder = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // This is where you would typically make an API call to check the order status
        // For demo purposes, we'll just set a mock status
        setOrderStatus({
            number: orderNumber,
            status: 'In Transit',
            estimatedDelivery: '2024-01-20',
            location: 'Local Distribution Center'
        });
    };

    return (
        <div className="track-order-container">
            <h2>Track Your Order</h2>
            <form onSubmit={handleSubmit} className="track-order-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter your order number"
                        required
                    />
                    <button type="submit">Track Order</button>
                </div>
            </form>

            {orderStatus && (
                <div className="order-status">
                    <h3>Order Details</h3>
                    <div className="status-details">
                        <p><strong>Order Number:</strong> {orderStatus.number}</p>
                        <p><strong>Status:</strong> {orderStatus.status}</p>
                        <p><strong>Estimated Delivery:</strong> {orderStatus.estimatedDelivery}</p>
                        <p><strong>Current Location:</strong> {orderStatus.location}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;