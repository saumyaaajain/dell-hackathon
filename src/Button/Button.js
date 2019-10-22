import React from 'react';
import Arrow from './arrow1.svg';
import './Button.css';

const Button = () => {
    let alert1 = () => {
        let name = prompt("What is your name");
        alert("Hello " + name + "!!");
    }
    return (
        <div className="button-comp">
            <button className="btn1" onClick={alert1}>
                <span className="btn-content">Know More &nbsp;</span>
                <img src={Arrow} className="image1" alt="arrow" />
            </button>
        </div>
    )
}

export default Button;