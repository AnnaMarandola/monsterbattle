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
      this.setState({ Monster1: MonsterInfo });
    });
    choosedPlayer1 -= 1;
  }
  
  getMonster2() {
    axios
    .get('https://hackathon-wild-hackoween.herokuapp.com/monsters')
    .then(response => response.data)
    .then(data => data.monsters[randomMonster(20)])
    .then(MonsterInfo => {
      this.setState({ Monster2: MonsterInfo });
    });
    choosedPlayer2 -= 1;
  }
  
  
  attack1() {
    if (this.state.Monster2) {
      if (this.state.Monster2.defense - this.state.Monster1.attack > 0) {
        this.setState({ Monster2: {...this.state.Monster2, defense: (this.state.Monster2.defense - this.state.Monster1.attack)} })
      }
      else {
        this.setState({ Monster2: {...this.state.Monster2, defense: 'died'}})
      }
    }
  }

  attack2() {
    if (this.state.Monster1) {
      if (this.state.Monster1.defense - this.state.Monster2.attack > 0) {
        this.setState({ Monster1: {...this.state.Monster1, defense: (this.state.Monster1.defense - this.state.Monster2.attack)} })
      }
      else {
        this.setState({ Monster1: {...this.state.Monster1, defense: 'died'}})
      }
    }
  }

  render() {
    return (
      <div className="div-globale">
        <div className="player1">
          <button className="btn-player1" onClick={ choosedPlayer1 === 0 ? this.getMonster1 : null }>
            Bloody Player 1
          </button>
          {this.state.Monster1 && <MonsterInfo infos={this.state.Monster1} />}
        </div>
        <div className="player2">
          <button className="btn-player1" onClick={ choosedPlayer2 === 0 ? this.getMonster2 : null }>
            Bloody Player 2
          </button>
          {this.state.Monster2 && <MonsterInfo infos={this.state.Monster2} />}
        </div>
        <div className="fightButton">
          <button onClick={this.attack1}>ULTRA BLOODY ATTACK 1</button>
          <button onClick={this.attack2}>ULTRA BLOODY ATTACK 2</button>
        </div>
      </div>
    );
  }
}


export default MonsterCard;
