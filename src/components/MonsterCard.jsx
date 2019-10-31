import React, { Component } from 'react';
import axios from 'axios';
import MonsterInfo from './MonsterInfo';
import './MonsterInfo.css';

function randomMonster(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class MonsterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Monster1: null,
      Monster2: null,
    };
    this.getMonster1 = this.getMonster1.bind(this);
    this.getMonster2 = this.getMonster2.bind(this);
  }
  componentDidMount() {
    this.getMonster1();
    this.getMonster2();
  }
  getMonster1() {
    axios
      .get('https://hackathon-wild-hackoween.herokuapp.com/monsters')
      .then(response => response.data)
      .then(data => data.monsters[randomMonster(20)])
      .then(MonsterInfo => {
        this.setState({ Monster1: MonsterInfo });
      });
  }

  getMonster2() {
    axios
      .get('https://hackathon-wild-hackoween.herokuapp.com/monsters')
      .then(response => response.data)
      .then(data => data.monsters[randomMonster(20)])
      .then(MonsterInfo => {
        this.setState({ Monster2: MonsterInfo });
      });
  }

  attack ({attack, defense}) {
    this.setState({Monster2: defense})
    return defense - attack
}
  render() {
    return (
      <div className="div-globale">
        <div className="player1">
          <button className="btn-player1" onClick={this.getMonster1}>
            Bloody Player 1
          </button>
          {this.state.Monster1 && <MonsterInfo infos={this.state.Monster1} />}
        </div>
        <div className="player2">
          <button className="btn-player1" onClick={this.getMonster2}>
            Bloody Player 2
          </button>
          {this.state.Monster2 && <MonsterInfo infos={this.state.Monster2} />}
        </div>
      </div>
    );
  }
}
export default MonsterCard;
