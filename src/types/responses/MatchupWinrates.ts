export interface MatchupWinrateResponse {
  last_update: string
  data_all:    MatchupData[]
  data_vanq:   MatchupData[]
}

export interface MatchupData {
  char_name:  string
  char_short: string
  matchups:   Matchup[]
}

export interface Matchup {
  char_name:   string
  char_short:  string
  wins:        number
  total_games: number
}