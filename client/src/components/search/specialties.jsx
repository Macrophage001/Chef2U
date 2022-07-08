import React from 'react'

const Specialties = (props) => {
    return (
        <div className={`chef-specialties ${props.className}`}>
            <p>Specialties:</p>
            {props.chef.specialties && props.chef.specialties.map((specialty, index) => <p key={index} className="specialty">{specialty.charAt(0).toUpperCase() + specialty.slice(1)}</p>)}
        </div>
    );
}

export default Specialties