import React from 'react'

const Card = (props) => {
    const sanitizedProps = { ...props, className: `card ${props.className}` };
    return (
        <div {...sanitizedProps}>
            {props.children}
        </div>
    );
}

export default Card;