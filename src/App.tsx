import React from 'react';
import './styles/App/App.css';

import Header from './components/header/Header';

import LineChart from './components/visualisations/RankDistributions/RankDistribution';
import MatchupRadioChart from './components/visualisations/MatchupWinrates/MatchupWinrates';
import HeaderT from './components/HeaderT/HeaderT';

function App() {
  return (
    <div className="App">
      {/* <Header></Header> */}
      <HeaderT></HeaderT>

      {/* <LineChart></LineChart> */}
      <MatchupRadioChart></MatchupRadioChart>
      
    </div>
  );
}

export default App;
