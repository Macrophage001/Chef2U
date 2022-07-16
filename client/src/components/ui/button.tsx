import React from 'react';

import '../../styles/button.css';

const Button = ({ label = "Button", onClick, ...props }) => {
    return (
        <button className={`orange-button ${props.className}`} onClick={onClick} {...props}>
            <p>{label}</p>
        </button>
    )
}

export default Button