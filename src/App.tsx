import React from 'react';
import styles from './styles/App/App.module.css';

import Header from './components/header/Header';

import LineChart from './components/visualisations/RankDistributions/RankDistribution';
import MatchupRadioChart from './components/visualisations/MatchupWinrates/MatchupWinrates';
import HeaderT from './components/HeaderT/HeaderT';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';

function App() {
  return (

    <BrowserRouter basename='/ggst-stats' >
      <div className={styles.App}>
        <HeaderT></HeaderT>
        <Loader></Loader>

        <Routes>
          <Route path="/" element={<MatchupRadioChart/>}/>
          <Route path="/rank-distribution" element={<LineChart/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    // <div className="App">
    //   {/* <Header></Header> */}
    //   <HeaderT></HeaderT>

    //   {/* <LineChart></LineChart> */}
    //   <MatchupRadioChart></MatchupRadioChart>
      
    // </div>
  );
}

export default App;
