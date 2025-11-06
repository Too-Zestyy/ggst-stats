import { useEffect, useState } from 'react';
import { RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Legend, PolarGrid } from 'recharts';
import { MatchupWinrateResponse } from '../../types/responses/MatchupWinrates';
import { getCorsProxiedJSON } from '../../utils/requests/corsProxy';
import { MatchupCharacterNames } from '../../types/data/matchupChart';


export default ({ isAnimationActive = true }: { isAnimationActive?: boolean }) => {

  const [matchupData, setMatchupData] = useState<Array<any> | undefined>();
  const [charList, setCharList] = useState<MatchupCharacterNames[]>();

  useEffect(() => {
    (async () => {
      const data: MatchupWinrateResponse = await getCorsProxiedJSON('https://puddle.farm/api/matchups') as MatchupWinrateResponse;

      // TODO: replace display of all matchups at once with select for single characters. Additionally, add vanquisher matchups (separately)

      let transformedData: any = [];

      let curCharList: MatchupCharacterNames[] = [];

      data.data_all.forEach((item) => {
        transformedData.push({
          opponent: item.char_short,
          // abbreviation: item.char_short
        })

        curCharList.push({
          full_name: item.char_name,
          abbreviation: item.char_short
        })
      });

      setCharList(curCharList);

      console.log(transformedData);

      data.data_all.forEach((character) => { 
          character.matchups.forEach((matchup) => {

            for (let i = 0; i < transformedData.length; i++) {
              if (transformedData[i].opponent === matchup.char_short) {
                transformedData[i][character.char_short] = ((matchup.wins / matchup.total_games) * 100) - 50;
                break;
              }
            }
          })
      });

      // TODO: Add vanquisher data while keeping within the same chart

      data.data_vanq.forEach((character) => { 
          character.matchups.forEach((matchup) => {

            for (let i = 0; i < transformedData.length; i++) {
              if (transformedData[i].opponent === matchup.char_short) {
                transformedData[i][character.char_short + ' [V]'] = ((matchup.wins / matchup.total_games) * 100) - 50;
                break;
              }
            }
          })
      });

      setMatchupData(transformedData);

      console.log(transformedData);

    })()
  }, []);

  return (
    matchupData !== undefined && charList !== undefined ?
    <RadarChart style={{ width: '100%', maxWidth: '500px', maxHeight: '70vh', aspectRatio: 1 }} responsive data={matchupData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="opponent" />
      <PolarRadiusAxis angle={90} domain={[-10, 10]} />
      

      { 
        charList.map((matchup) => {
          return (<Radar
            name={matchup.abbreviation}
            dataKey={matchup.abbreviation}
            key={matchup.abbreviation}
            stroke="pink"
            fill="pink"
            fillOpacity={0.6}
            isAnimationActive={isAnimationActive}
          />)
        })
      }

      { 
        charList.map((matchup) => {
          return (<Radar
            name={matchup.abbreviation + ' [V]'}
            dataKey={matchup.abbreviation + ' [V]'}
            key={matchup.abbreviation + ' [V]'}
            stroke="yellow"
            fill="yellow"
            fillOpacity={0.6}
            isAnimationActive={isAnimationActive}
          />)
        })
      }

      {/* <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
        isAnimationActive={isAnimationActive}
      />
      <Radar
        name="Lily"
        dataKey="B"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.6}
        isAnimationActive={isAnimationActive}
      /> */}
      <Legend />
    </RadarChart>
    : <div></div>
  )
  
};