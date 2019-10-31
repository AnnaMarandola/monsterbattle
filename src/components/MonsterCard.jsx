import React, { Component } from 'react';
import axios from 'axios';
import MonsterInfo from './MonsterInfo';
import BackCard from './BackCard'
import './MonsterInfo.css';

function randomMonster(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let choosedPlayer1 = 1;
let choosedPlayer2 = 1;
let tokenPlayer1 = 1;
let tokenPlayer2 = 1;


class MonsterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Monster1: null,
      Monster2: null,
    };
    this.getMonster1 = this.getMonster1.bind(this);
    this.getMonster2 = this.getMonster2.bind(this);
    this.attack1 = this.attack1.bind(this);
    this.attack2 = this.attack2.bind(this);
  }
  
  componentDidMount() {
    this.getMonster1();
    this.getMonster2();
    this.attack1();
    this.attack2();
  }

  getMonster1() {
    axios
    .get('https://hackathon-wild-hackoween.herokuapp.com/monsters')
    .then(response => response.data)
    .then(data => data.monsters[randomMonster(20)])
    .then(MonsterInfo => {
      this.setState({ Monster1: MonsterInfo, isDead: false, score: 15 });
    });
    choosedPlayer1 -= 1;
  }
  
  getMonster2() {
    axios
    .get('https://hackathon-wild-hackoween.herokuapp.com/monsters')
    .then(response => response.data)
    .then(data => data.monsters[randomMonster(20)])
    .then(MonsterInfo => {
      this.setState({ Monster2: MonsterInfo, isDead: false, score: 15 });
    });
    choosedPlayer2 -= 1;
  }
  
  
  attack1() {
    if (this.state.Monster2) {
      if (this.state.Monster2.defense - this.state.Monster1.attack > 0) {
        this.setState({ Monster2: {...this.state.Monster2, defense: (this.state.Monster2.defense - this.state.Monster1.attack)} })
        tokenPlayer1 -= 1;
        tokenPlayer2 += 1;
      }
      else {
        this.setState({ Monster2: {...this.state.Monster2, defense: '0', isDead: true}});
        tokenPlayer2 = 0;
        tokenPlayer1 = 0;   
      }
    }
  }

  attack2() {
    if (this.state.Monster1) {
      if (this.state.Monster1.defense - this.state.Monster2.attack > 0) {
        this.setState({ Monster1: {...this.state.Monster1, defense: (this.state.Monster1.defense - this.state.Monster2.attack)} })
        tokenPlayer2 -= 1;
        tokenPlayer1 += 1;
      }
      else {
        this.setState({ Monster1: {...this.state.Monster1, defense: '0', isDead: true}});
        tokenPlayer1 = 0;
        tokenPlayer2 = 0;
      }
    }
  }

  render() {
    return (
      <div>
        <div className="div-globale">
          <div className="player1">
            <button className="btn-player1" onClick={ choosedPlayer1 === 0 ? this.getMonster1 : null }>
              Choose Player 1
            </button>
            <h2>{this.Monster1.score}</h2>
            {this.state.Monster1 && choosedPlayer1 !== 0 ? <MonsterInfo infos={this.state.Monster1} /> : <BackCard />}
          </div>
          <div className="player2">
            <button className="btn-player2" onClick={ choosedPlayer2 === 0 ? this.getMonster2 : null }>
              Choose Player 2
            </button>
            {this.state.Monster2 && choosedPlayer2 !== 0 ? <MonsterInfo infos={this.state.Monster2} /> : <BackCard />}
          </div>
          <div className="fightButton">
          </div>
        </div>
        <div className="attackButtons">
          <button onClick={tokenPlayer1 > 0 ? this.attack1 : null}>ULTRA BLOODY ATTACK 1</button>
          <button onClick={tokenPlayer2 > 0 ? this.attack2 : null}>ULTRA BLOODY ATTACK 2</button>
        </div>
      </div>
    );
  }
}


export default MonsterCard;
