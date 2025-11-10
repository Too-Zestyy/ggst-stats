import React from 'react';
import './styles/App/App.css';

import Header from './components/header/Header';

import LineChart from './components/visualisations/RankDistributions/RankDistribution';
import MatchupRadioChart from './components/visualisations/MatchupWinrates/MatchupWinrates';

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
