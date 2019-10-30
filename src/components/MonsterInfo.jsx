import React from 'react';
const MonsterInfo = ({ infos }) => {
  const { name, picture } = infos;
  return (
    <div>
      <img src={picture} alt="monster"></img>
      <h3>{name}</h3>
    </div>
  )
}
export default MonsterInfo;