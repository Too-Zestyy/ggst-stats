import React from 'react';
import './styles/App/App.css';

import Header from './components/app/header/Header';

import LineChart from './components/visualisations/RankDistribution';
import MatchupRadioChart from './components/visualisations/MatchupWinrates';

function App() {
  return (
    <div className="App">
      <Header></Header>

      {/* <LineChart></LineChart> */}
      <MatchupRadioChart></MatchupRadioChart>
      
    </div>
  );
}

export default App;
