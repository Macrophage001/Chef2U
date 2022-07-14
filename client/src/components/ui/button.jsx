import React from 'react';

import '../../styles/button.css';

const Button = ({ className, label = "Button", onClick, ...props }) => {
    return (
        <button className={`orange-button ${className}`} onClick={onClick} {...props}>
            <p>{label}</p>
        </button>
    )
}

export default Button