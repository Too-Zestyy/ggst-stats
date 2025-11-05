export interface RankBoundary {
    name: string,
    lower_boundary: number
};

const rankBoundaries: Array<RankBoundary> = [
    {
        name: "Placement",
        lower_boundary: 0,
    },

    {
        name: "Iron 1",
        lower_boundary: 1,
    },
    {
        name: "Iron 2",
        lower_boundary: 1_000,
    },
    {
        name: "Iron 3",
        lower_boundary: 2_000,
    },

    {
        name: "Bronze 1",
        lower_boundary: 3_000,
    },
    {
        name: "Bronze 1",
        lower_boundary: 4_200,
    },
    {
        name: "Bronze 1",
        lower_boundary: 5_400,
    },

    {
        name: "Silver 1",
        lower_boundary: 6_600,
    },
    {
        name: "Silver 2",
        lower_boundary: 8_800,
    },
    {
        name: "Silver 3",
        lower_boundary: 11_000,
    },

    {
        name: "Gold 1",
        lower_boundary: 13_200,
    },
    {
        name: "Gold 2",
        lower_boundary: 15_600,
    },
    {
        name: "Gold 3",
        lower_boundary: 18_000,
    },

    {
        name: "Platinum 1",
        lower_boundary: 20_400,
    },
    {
        name: "Platinum 2",
        lower_boundary: 24_400,
    },
    {
        name: "Platinum 3",
        lower_boundary: 28_400,
    },

    {
        name: "Diamond 1",
        lower_boundary: 32_400,
    },
    {
        name: "Diamond 2",
        lower_boundary: 36_000,
    },
    {
        name: "Diamond 3",
        lower_boundary: 40_800,
    },

    {
        name: "Vanquisher",
        lower_boundary: 45_000,
    },
];