import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Legend, PolarGrid } from 'recharts';
import { MatchupWinrateResponse } from '../../../types/responses/MatchupWinrates';
import { getCorsProxiedJSON } from '../../../utils/requests/corsProxy';
import { MatchupCharacterNames } from '../../../types/data/matchupChart';

import styles from './MatchupWinrates.module.css';
import { genHslSpectrum } from '../../../utils/colours/hslSpectrum';

type CheckboxState = [
  boolean, 
  Dispatch<SetStateAction<boolean>>
];

type MatchupDataPoint = {
  opponent: string,
  [playingAs: string]: string | number
}

const DEFAULT_WIN_DELTA = 5;

export default ({ isAnimationActive = true }: { isAnimationActive?: boolean }) => {

  const [matchupResponse, setMatchupResponse] = useState<MatchupWinrateResponse>();
  const [matchupData, setMatchupData] = useState<Array<any> | undefined>();
  const [maxWinDelta, setMaxWinDelta] = useState<number>(DEFAULT_WIN_DELTA);

  const [charList, setCharList] = useState<MatchupCharacterNames[]>();
  const [colourList, setColourList] = useState<string[]>([]);

  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);

  const buildCharList = (respData: MatchupWinrateResponse) => {
    let curCharList: MatchupCharacterNames[] = [];

    // TODO: Generate colour list based on available chars, 

      respData.data_all.forEach((item) => {
        curCharList.push({
          full_name: item.char_name,
          abbreviation: item.char_short
        })

        // for (let i = 0; i < 2; i++) {
        //   colourList.push(getRandomRGBColour());
        // }
      });
      setCharList(curCharList);
      setColourList(genHslSpectrum(respData.data_all.length, 2));
  }

  const buildGraphData = (respData: MatchupWinrateResponse, charsEnabled: boolean[]): MatchupDataPoint[] => {
    setMaxWinDelta(DEFAULT_WIN_DELTA);

    let transformedData: MatchupDataPoint[] = [];

    respData.data_all.forEach((item) => {
        transformedData.push({
          opponent: item.char_short,
          // abbreviation: item.char_short
        })
      });

    respData.data_all.forEach((character, c_idx) => { 
          if (!charsEnabled[c_idx]) {
            return;
          }
          character.matchups.forEach((matchup) => {

            
              for (let i = 0; i < transformedData.length; i++) {
              if (transformedData[i].opponent === matchup.char_short) {
                const wr = ((matchup.wins / matchup.total_games) * 100) - 50;
                if (Math.abs(wr) > maxWinDelta) {
                  setMaxWinDelta(Math.abs(wr));
                }

                transformedData[i][character.char_short] = wr;
                break;
              }
            }
          })
      });

      // TODO: Add vanquisher data while keeping within the same chart

      respData.data_vanq.forEach((character) => { 
          character.matchups.forEach((matchup) => {

              for (let i = 0; i < transformedData.length; i++) {
              if (transformedData[i].opponent === matchup.char_short) {
                const wr = ((matchup.wins / matchup.total_games) * 100) - 50;
                if (Math.abs(wr) > maxWinDelta) {
                  setMaxWinDelta(Math.abs(wr));
                }

                transformedData[i][character.char_short + ' [V]'] = wr;
                break;
              }
            }
            
          })
      });

    return transformedData;
  }

  // let checkboxStates: CheckboxState[] = [];

  useEffect(() => {
    (async () => {
      const data: MatchupWinrateResponse = await getCorsProxiedJSON('https://puddle.farm/api/matchups') as MatchupWinrateResponse;
      await setMatchupResponse(data);

      // TODO: Add toggle for vanquisher vs lower ranks


      data.data_all.forEach((item) => {

        let curboxStates = checkboxStates;
        checkboxStates.push(false)

        setCheckboxStates(curboxStates);
      });

      buildCharList(data);

      setMatchupData(buildGraphData(data, checkboxStates));

      // console.log(transformedData);

    })()
  }, []);

  return (
    matchupData !== undefined && charList !== undefined ?
    <div className={styles.container}>
      <div className={styles.characterSelectionMenu}>
        { 
          charList.map((matchup, i) => {
            return (
            <div key={i}>
              <p>{matchup.abbreviation}</p>
              <input type='checkbox' data-idx={i} name={matchup.abbreviation}
                    onChange={e => {
                      
                            let curboxStates = checkboxStates;

                            const keyVal = e.target.getAttribute('data-idx');

                            if (keyVal === null) {
                              throw Error('No key found for character select checkbox')
                            } 
                            else {
                              curboxStates[parseInt(keyVal)] = e.target.checked;
                              setCheckboxStates(curboxStates);
                            }

                            if (matchupResponse === undefined) {
                              throw Error('Matchup response data not stored within state for graph update')
                            }

                            setMatchupData(buildGraphData(matchupResponse, checkboxStates));
                   }}/>
              
            </div>
          )
          })
        }
      </div>

      <RadarChart style={{ width: '33%', aspectRatio: 1 }} responsive data={matchupData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="opponent" />
        <PolarRadiusAxis angle={90} domain={[-20, 20]} />
        

        { 
          charList.map((matchup, i) => {
            return (
              checkboxStates[i] ?
              <Radar
                name={matchup.abbreviation}
                dataKey={matchup.abbreviation}
                key={matchup.abbreviation}
                stroke={colourList[i * 2]}
                fill={colourList[i * 2]}
                fillOpacity={0.6}
                isAnimationActive={isAnimationActive}
              />
              : undefined
          )
          })
        }

        {
          charList.map((matchup, i) => {
            return (
            checkboxStates[i] ?
            <Radar
              name={matchup.abbreviation + ' [V]'}
              dataKey={matchup.abbreviation + ' [V]'}
              key={matchup.abbreviation + ' [V]'}
              stroke={colourList[i * 2 + 1]}
              fill={colourList[i * 2 + 1]}
              fillOpacity={0.6}
              isAnimationActive={isAnimationActive}
            />
            : undefined
          )
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
    </div>
    
    : <div></div>
  )
  
};