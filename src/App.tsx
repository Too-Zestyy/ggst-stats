import React from 'react';
import './styles/App/App.min.css';

import LineChart from './components/visualisations/RankDistribution'
import Header from './components/app/header/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <LineChart></LineChart>
    </div>
  );
}

export default App;
