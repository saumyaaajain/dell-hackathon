import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div className="card-comp">
            <div className="card card-cascade">
                <div className="view view-cascade overlay">
                    <img className="card-img-top" src={props.src} alt="Card cap" />
                    <a>
                        <div className="mask rgba-white-slight"></div>
                    </a>
                </div>

                <div class="card-body card-body-cascade text-center">
                    <h4 class="card-title"><strong>{props.name}</strong></h4>
                    <h6 class="font-weight-bold indigo-text py-2">{props.work}</h6>
                    <p class="card-text">{props.content}</p>
                    <a type="button" class="btn-floating btn-small btn-fb"><i class="fab fa-facebook-f"></i></a>
                    <a type="button" class="btn-floating btn-small btn-tw"><i class="fab fa-twitter"></i></a>
                    <a type="button" class="btn-floating btn-small btn-dribbble"><i class="fab fa-dribbble"></i></a>
                </div>
                <div class="card-footer text-muted text-center">
                    {props.blogtime}
                </div>
            </div>
        </div>
    )
}

export default Card;