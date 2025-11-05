import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RankDistributionResponse } from '../../types/responses/RankDistribution';
import { RankDistributionGraphDataPoint } from '../../types/data/RankDistribution';

// #region Sample data
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// #endregion

export default () => {

  const [rankDistributionData, setRankDistributionData] = useState<RankDistributionGraphDataPoint[]>();

  // async IIFE
  useEffect(() => {
    (async () => {

    try {
      const resp = await fetch('https://proxy.corsfix.com/?https://puddle.farm/api/distribution');

      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
      }

      const data: RankDistributionResponse = await resp.json();

      let graphData: RankDistributionGraphDataPoint[] = [];

      data.data.distribution_rating.forEach((item) => {
        graphData.push({
          name: item.lower_bound.toString(),
          player_count: item.count
        })
      })


      setRankDistributionData(graphData);
    }
    
    catch (error) {
      console.log(error);
    }



    })()
  }, [])

  return (

    rankDistributionData !== undefined ?
    <div>
      <LineChart
        style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={rankDistributionData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="player_count" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="player_count" stroke="#82ca9d" /> */}
      </LineChart>
      <p>{JSON.stringify(rankDistributionData)}</p>
    </div>
    
    : <div></div>
  );
}