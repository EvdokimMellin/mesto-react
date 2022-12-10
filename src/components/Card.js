import React from "react"

export default function Card (props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="card">
            <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick}/>
            <h2 className="card__title">{props.card.name}</h2>
            <button className="card__like-button" type="button"></button>
            <p className="card__likes-number">{props.card.likes.length}</p>
        </li>
    )
  }
