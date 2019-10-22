import React from 'react';
import Image from './beach.jpg';
import './NormalImg.css';

const NormalImg = () => {
    return (
        <div className="NormalImg">
            <img className="beach-image" src={Image} alt="beach" width="600px" height="400px" />
        </div>
    )
}

export default NormalImg;