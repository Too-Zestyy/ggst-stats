import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RankDistributionResponse } from '../../../types/responses/RankDistribution';
import { RankDistributionGraphDataPoint } from '../../../types/data/RankDistribution';
import { getCorsProxiedJSON } from '../../../utils/requests/corsProxy';

export default () => {

  const [rankDistributionData, setRankDistributionData] = useState<RankDistributionGraphDataPoint[]>();

  // async IIFE
  useEffect(() => {
    (async () => {
    try {

      const resp = await fetch('https://puddle.farm/api/distribution', {headers: {'Accept': 'application/json'}});

      const data: RankDistributionResponse = await resp.json() as RankDistributionResponse;

      // const resp = await fetch('https://puddle.farm/api/distribution', {
      //   headers: {
      //     Accept: 'application/json'
      //   }
      // });

      // const data: RankDistributionResponse = await resp.json();

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
      </LineChart>
      <p>{JSON.stringify(rankDistributionData)}</p>
    </div>
    
    : undefined
  );
}