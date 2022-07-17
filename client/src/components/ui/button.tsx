import React, { useEffect, useState } from 'react';

import '../../styles/button.css';

interface IButtonProps {
    className?: string;
    label?: string;
    onClick?: () => void;
    [x: string]: any;
}

const Button: React.FC<IButtonProps> = ({ className, label = "Button", onClick, ...props }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [buttonClassName, setButtonClassName] = useState(className);

    useEffect(() => {
        if (isClicked) {
            setButtonClassName(`${className} bounce`);
            let t = setTimeout(() => {
                setButtonClassName(className);
                clearTimeout(t);
            }, 150);
            setIsClicked(false);
        }
    }, [isClicked]);

    const handleClick = (e: React.MouseEvent) => {
        setIsClicked(true);
        onClick && onClick();
    }

    return (
        <button className={`orange-button ${buttonClassName}`} onClick={handleClick} {...props}>
            <p>{label}</p>
        </button>
    )
}

export default Button