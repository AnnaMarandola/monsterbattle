import React from 'react';
import axios from 'axios';

class GetMonster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monster : ''
    };
    this.getMonster = this.getMonster.bind(this);
  }
  getMonster() {
    axios.get("https://hackathon-wild-hackoween.herokuapp.com/monsters")
    .then(response => response.data)
    .then(data => {
      this.setState({
        monster : data.monsters[0]
      }
      )
    })
  }

  render() {
    return (
      <div>
        <div monster = {this.state.monster} ></div>
        <button onClick = {this.getMonster}>Get Monster</button>
      </div>
    )
  }
}

export default GetMonster;
