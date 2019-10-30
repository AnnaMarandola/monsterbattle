import React from 'react';
import MonsterCard from './components/MonsterCard';
import './App.css';
import DisplayCard from './components/DisplayCard';

function App() {
  return (
    <div className="App">
    <p><MonsterCard /></p>
    <DisplayCard />
    </div>
  );
}

export default App;