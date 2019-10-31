import React from 'react';
import bloodBottomCard from '../assets/bloodBottomCard.png';
import './MonsterInfo.css';

const MonsterInfo = ({ infos }) => {
  const { name, picture, special, attack, defense, description, isDead, score } = infos;
  return (
    <div className="cardBehindButton">
      <figure>
        <div className="nameNspecial">
          <p>{name}</p>
        </div>
        <div className={isDead ? "monsterDied" : "imageMonster"}>
          <img src={picture} alt=""/>
          {isDead ? <p className="deadText">DEAD</p> : null}
        </div>
        <div className="bodyCard">
          <small>{special}</small>
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
