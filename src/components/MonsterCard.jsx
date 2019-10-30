import React, { Component } from 'react';
import axios from 'axios';
import MonsterInfo from './MonsterInfo';

function randomMonster(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

class MonsterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Monster: null,
    };
    this.getMonster = this.getMonster.bind(this);
  }
  componentDidMount() {
    this.getMonster();
  }
  getMonster() {
    axios.get('https://hackathon-wild-hackoween.herokuapp.com/monsters')
      .then(response => response.data)
      .then(data => data.monsters[randomMonster(20)])
      .then(MonsterInfo => {
        this.setState({ Monster: MonsterInfo })
      })
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.getMonster}>Get Monster</button>
          {this.state.Monster && <MonsterInfo infos={this.state.Monster} />}
        </div>
      </div>
    );
  }
}
export default MonsterCard;
