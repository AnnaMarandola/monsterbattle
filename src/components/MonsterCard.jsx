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
let score1 = 0;
let score2 = 0;


class MonsterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Monster1: null,
      Monster2: null
    };
    this.getMonster1 = this.getMonster1.bind(this);
    this.getMonster2 = this.getMonster2.bind(this);
    this.attack1 = this.attack1.bind(this);
    this.attack2 = this.attack2.bind(this);
    this.refreshGame = this.refreshGame.bind(this);
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
      this.setState({ Monster1: MonsterInfo, isDead: false });
    });
    choosedPlayer1 -= 1;
  }
  
  getMonster2() {
    axios
    .get('https://hackathon-wild-hackoween.herokuapp.com/monsters')
    .then(response => response.data)
    .then(data => data.monsters[randomMonster(20)])
    .then(MonsterInfo => {
      this.setState({ Monster2: MonsterInfo, isDead: false });
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
        score1 += 1;
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
        score2 += 1;
      }
    }
  }

  refreshGame() {
    this.setState({Monster1: null})
    this.setState({Monster2: null})
    choosedPlayer1 = 0;
    choosedPlayer2 = 0;
    tokenPlayer1 = 1;
    tokenPlayer2 = 1;
  }

  render() {
    return (
      <div>
        <div className="div-globale">
          <div className="score" id="score1"> SCORE : <br/>{score1}</div>
          <div className="player1">
            <button className="btn-player1" onClick={ choosedPlayer1 === 0 ? this.getMonster1 : null }>
              Choose Player 1
            </button>
            {this.state.Monster1 && choosedPlayer1 !== 0 ? <MonsterInfo infos={this.state.Monster1} /> : <BackCard />}
          </div>
          <div className="player2">
            <button className="btn-player2" onClick={ choosedPlayer2 === 0 ? this.getMonster2 : null }>
              Choose Player 2
            </button>
            {this.state.Monster2 && choosedPlayer2 !== 0 ? <MonsterInfo infos={this.state.Monster2} /> : <BackCard />}
          </div>
          <div className="score"> SCORE : <br/> {score2}</div>
          <div className="fightButton">
          </div>
        </div>
        <div className="attackButtons">
          <button onClick={tokenPlayer1 > 0 ? this.attack1 : null}>ULTRA BLOODY ATTACK 1</button>
          <button onClick={tokenPlayer2 > 0 ? this.attack2 : null}>ULTRA BLOODY ATTACK 2</button>
        </div>
        <div className="nextroundButtons">
          <button className={this.state.Monster1 && this.state.Monster1.isDead === true ? 'refreshButtonShowed' : 'refreshButtonHidden'} onClick={this.refreshGame}>Next Round</button>
          <button className={this.state.Monster2 && this.state.Monster2.isDead === true ? 'refreshButtonShowed' : 'refreshButtonHidden'} onClick={this.refreshGame}>Next Round</button>
        </div>
      </div>
    );
  }
}

export default MonsterCard;
