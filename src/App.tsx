import React from 'react';
import styles from './styles/App/App.module.css';

import LineChart from './components/visualisations/RankDistributions/RankDistribution';
import MatchupRadioChart from './components/visualisations/MatchupWinrates/MatchupWinrates';
import AppHeader from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/routing/Loader/Loader';

function App() {
  return (

    <BrowserRouter basename='/ggst-stats' >
      <div className={styles.App}>
        <AppHeader></AppHeader>

        <Routes>
          <Route path="/" element={<MatchupRadioChart/>}/>
          <Route path="/rank-distribution" element={<LineChart/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
