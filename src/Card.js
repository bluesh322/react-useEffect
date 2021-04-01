import React, { useState } from 'react';
import './Card.css';

const Card = ({name, image}) => {

    const [{angle}] = useState({
        angle: (Math.random() * 45)-15
    })
    const transform = `rotate(${angle}deg)`;

    return (
    <img className="Card" alt={name} src={image} style={{transform}}/>
    );
}

export default Card;