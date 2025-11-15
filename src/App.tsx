import React from 'react';
import styles from './styles/App/App.module.css';

import AppHeader from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/routing/Loader/Loader';
import MatchupRadioChart from './components/pages/components/visualisations/MatchupWinrates/MatchupWinrates';
import RankDistributionChart from './components/pages/components/visualisations/RankDistributions/RankDistribution';

function App() {
  return (

    <BrowserRouter basename='/ggst-stats' >
      <div className={styles.App}>
        <AppHeader></AppHeader>

        <div className={styles.appBody}>
          <Routes>
            <Route path="/" element={<MatchupRadioChart/>}/>
            <Route path="/rank-distribution" element={<RankDistributionChart/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
