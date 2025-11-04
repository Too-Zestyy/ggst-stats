export interface RankDistributionResponse {
    timestamp: Date;
    data:      Data;
}

export interface Data {
    one_month_players:   number;
    distribution_rating: DistributionRating[];
}

export interface DistributionRating {
    lower_bound: number;
    upper_bound: number;
    count:       number;
    percentage:  number;
    percentile:  number;
}
