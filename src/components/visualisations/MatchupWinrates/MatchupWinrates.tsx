import { Dispatch, JSX, SetStateAction, useEffect, useState } from 'react';
import { RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Legend, PolarGrid } from 'recharts';
import { MatchupWinrateResponse } from '../../../types/responses/MatchupWinrates';
import { getCorsProxiedJSON } from '../../../utils/requests/corsProxy';
import { MatchupCharacterNames } from '../../../types/data/matchupChart';

import styles from './MatchupWinrates.module.css';
import { genSimpleHslSpectrum } from '../../../utils/colours/hslSpectrum';

type MatchupDataPoint = {
  opponent: string,
  [playingAs: string]: string | number
}

// Create a literal type for radiobutton options, while retaining the ability to map over them
const datasetOptions = ['Diamond and below', 'Vanquisher', 'All'] as const;
type DatasetOption = typeof datasetOptions[number];

const DEFAULT_WIN_DELTA = 5;

export default ({ isAnimationActive = true }: { isAnimationActive?: boolean }) => {

  // #region ComponentState
  const [matchupResponse, setMatchupResponse] = useState<MatchupWinrateResponse>();
  const [matchupData, setMatchupData] = useState<Array<any> | undefined>();
  const [maxWinDelta, setMaxWinDelta] = useState<number>(DEFAULT_WIN_DELTA);

  const [charList, setCharList] = useState<MatchupCharacterNames[]>();

  const [datasetFilter, setDatasetFilter] = useState<DatasetOption>('All');
  const [characterCheckboxStates, setCharacterCheckboxStates] = useState<boolean[]>([]);
  // #endregion

  // #region GraphElementConstructors
  const genCharRadars = (vanquisher: boolean): JSX.Element[] => {

    let elements: JSX.Element[] = [];

    // Get colours equal to the number of checked boxes
    const colours = genSimpleHslSpectrum(
      characterCheckboxStates.filter(state => state).length, 
      vanquisher ? 90 : 70, vanquisher ? 80 : 55
    );

    let curColourIdx = 0;

    const charSuffix = + vanquisher ? ' [V]' : '';

    // Do not attempt to add radars if matchupData is undefined
    for (let i = 0; i < (charList?.length ?? 0); i++) {

      if (characterCheckboxStates[i]) {
        elements.push(
        <Radar
            name={charList?.at(i)?.abbreviation + charSuffix}
            dataKey={charList?.at(i)?.abbreviation + charSuffix}
            key={charList?.at(i)?.abbreviation + charSuffix}
            stroke={colours[curColourIdx]}
            fill={colours[curColourIdx]}
            fillOpacity={0.6}
            isAnimationActive={isAnimationActive}
          />
        )
        curColourIdx++;
      }
    }

    return elements

  }
  // #endregion

  // #region DataTransformationFunctions
  const buildCharList = (respData: MatchupWinrateResponse) => {
    let curCharList: MatchupCharacterNames[] = [];

      respData.data_all.forEach((item) => {
        curCharList.push({
          full_name: item.char_name,
          abbreviation: item.char_short
        })
      });
      setCharList(curCharList);
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
  // #endregion

  useEffect(() => {
    (async () => {
      const data: MatchupWinrateResponse = await getCorsProxiedJSON('https://puddle.farm/api/matchups') as MatchupWinrateResponse;
      await setMatchupResponse(data);

      // TODO: Add toggle for vanquisher vs lower ranks


      data.data_all.forEach((item) => {

        let curboxStates = characterCheckboxStates;
        characterCheckboxStates.push(false)

        setCharacterCheckboxStates(curboxStates);
      });

      buildCharList(data);

      setMatchupData(buildGraphData(data, characterCheckboxStates));

      // console.log(transformedData);

    })()
  }, []);

  return (
    matchupData !== undefined && charList !== undefined ?
    <div className={styles.container}>

      <div className={styles.controls}>
        <div className={styles.datasetRadiobuttons}>
          {
            datasetOptions.map(elem => {
              return (
                <div className={styles.datasetBoxContainer}>
                  <p>{elem}</p>
                  <input 
                    type='radio' data-value={elem} name='dataset-select' checked={elem === datasetFilter}
                    onChange={e => {

                      const selectionValue = e.target.getAttribute('data-value');

                      if (selectionValue === null) {
                        throw Error("Unknown radio button selected for dtaset filtering");
                      }
                      const typedSelection = selectionValue as DatasetOption;
                      setDatasetFilter(typedSelection);
                    }
                    }
                  ></input>
                </div>
              )
            })
          }
        </div>

        <div className={styles.characterSelectionMenu}>
          { 
            charList.map((matchup, i) => {
              return (
              <div key={i}>
                <p>{matchup.full_name}</p>
                <input type='checkbox' data-idx={i} name={matchup.abbreviation}
                      onChange={e => {
                        
                              let curboxStates = characterCheckboxStates;

                              const keyVal = e.target.getAttribute('data-idx');

                              if (keyVal === null) {
                                throw Error('No key found for character select checkbox')
                              } 
                              else {
                                curboxStates[parseInt(keyVal)] = e.target.checked;
                                setCharacterCheckboxStates(curboxStates);
                              }

                              if (matchupResponse === undefined) {
                                throw Error('Matchup response data not stored within state for graph update')
                              }

                              setMatchupData(buildGraphData(matchupResponse, characterCheckboxStates));
                    }}/>
                
              </div>
            )
            })
          }
        </div>
      </div>

      <RadarChart style={{ width: '33%', aspectRatio: 1 }} responsive data={matchupData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="opponent" />
        <PolarRadiusAxis angle={90} domain={[-20, 20]} />
        

        { 
          // TODO: Update both blocs to check for preference to include vanquisher data
          datasetFilter !== 'Vanquisher' &&
          genCharRadars(false)
        }

        {
          datasetFilter !== 'Diamond and below' &&
          genCharRadars(true)
        }
        <Legend />
      </RadarChart>
    </div>
    
    : <div></div>
  )
  
};