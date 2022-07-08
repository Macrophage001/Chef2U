import React from 'react'

import '../styles/button.css';

const Button = ({ className, label = "Button", onClick }) => {
    return (
        <button className={`orange-button ${className}`} onClick={onClick}>
            <p>{label}</p>
        </button>
    )
}

export default Button