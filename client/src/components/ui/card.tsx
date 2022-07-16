import React from 'react'

interface ICardProps {
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
    [x: string]: any;
}

const Card: React.FC<ICardProps> = (props) => {
    const sanitizedProps = { ...props, className: `card ${props.className}` };
    return (
        <div {...sanitizedProps}>
            {props.children}
        </div>
    );
}

export default Card;