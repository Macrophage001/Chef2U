import React from 'react';

import '../../styles/button.css';

interface IButtonProps {
    className?: string;
    label?: string;
    onClick?: () => void;
    [x: string]: any;
}

const Button: React.FC<IButtonProps> = ({ className, label = "Button", onClick, ...props }) => {
    return (
        <button className={`orange-button ${className}`} onClick={onClick} {...props}>
            <p>{label}</p>
        </button>
    )
}

export default Button