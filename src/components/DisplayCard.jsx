import React, { Component } from 'react';
import './DisplayCard.css';
import bloodBottomCard from '../assets/bloodBottomCard.png'


const monster = {
  id: 18,
  name: 'The Reaper',
  level: '5',
  attack: 12,
  defense: 8,
  special: 'Flying',
  description: 'In the Maelstrom, a trick of the light can feast on human flesh',
  picture: 'https://nsa40.casimages.com/img/2019/10/23/191023045327211233.jpg'
}


function DisplayCard() {
  return (
    <div>
      <figure>
        <div className="nameNspecial">
          <p>{monster.name}</p>
          <small>{monster.special}</small>
        </div>
        <div className="imageMonster">
          <img src={monster.picture}/>
        </div>
        <div className="bodyCard">
          <div className="attackNdefenseContainer">
            <div className="attackNdefenseTexts">
              <p>Attack</p>
              <p>Defense</p>
            </div>
            <div className="attackNdefenseInts">
              <p>{monster.attack}</p>
              <p>{monster.defense}</p>
            </div>
          </div>
          <blockquote>
            <p>{monster.description}</p>
          </blockquote>
        </div>
      </figure>
      <img src={bloodBottomCard} className="bloodBottomCard"/>
    </div>
  )
}

export default DisplayCard;