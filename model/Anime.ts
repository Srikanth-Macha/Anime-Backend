export interface Anime {
    sources:     string[];
    title:       string;
    type:        string;
    episodes:    number;
    status:      string;
    animeSeason: AnimeSeason;
    picture:     string;
    thumbnail:   string;
    synonyms:    string[];
    relations:   string[];
    tags:        string[];
}

export interface AnimeSeason {
    season: string;
    year?:  number;
}
