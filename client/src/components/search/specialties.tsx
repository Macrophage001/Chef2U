import React from 'react'
import { IUser } from '../../interfaces/IUser';

interface SpecialtiesProps {
    className: string;
    chef: IUser;
}

const Specialties: React.FC<SpecialtiesProps> = ({ chef, className }) => {
    // const { chef, className } = props;
    return (
        <div className={`chef-specialties ${className}`}>
            <p>Specialties:</p>
            {chef.specialties && chef.specialties.map((specialty, index) => <p key={index} className="specialty">{specialty.charAt(0).toUpperCase() + specialty.slice(1)}</p>)}
        </div>
    );
}

export default Specialties