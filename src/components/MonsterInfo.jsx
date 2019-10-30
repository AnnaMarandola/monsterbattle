import React from 'react';
import bloodBottomCard from '../assets/bloodBottomCard.png';
import './MonsterInfo.css';

const MonsterInfo = ({ infos }) => {
  const { name, picture, special, attack, defense, description } = infos;
  return (
    <div>
      <figure>
        <div className="nameNspecial">
          <p>{name}</p>
          <small>{special}</small>
        </div>
        <div className="imageMonster">
          <img src={picture} />
        </div>
        <div className="bodyCard">
          <div className="attackNdefenseContainer">
            <div className="attackNdefenseTexts">
              <p>Attack</p>
              <p>Defense</p>
            </div>
            <div className="attackNdefenseInts">
              <p>{attack}</p>
              <p>{defense}</p>
            </div>
          </div>
          <blockquote>
            <p>{description}</p>
          </blockquote>
        </div>
      </figure>
      {/* <img src={bloodBottomCard} className="bloodBottomCard" /> */}
    </div>
  );
};
export default MonsterInfo;
