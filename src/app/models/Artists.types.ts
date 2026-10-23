import { Tag } from "./RecordLabel.types";

export interface Artists {
    count:   number;
    offset:  number;
    artists: Artist[];
}

export interface Artist {
    id:             string;
    type?:          string;
    score:          number;
    name:           string;
    country?:       string;
    area?:          Area;
    beginArea?:  Area;
    disambiguation: string;
    lifeSpan:    ArtistLifeSpan;
    tags?:          Tag[];
}

export interface Area {
    id:          string;
    type:        string;
    name:        string;
}

export interface AreaLifeSpan {
    ended:  string | null;
    begin?: string;
}

export interface ArtistLifeSpan {
    begin?: string;
    ended:  boolean | null;
    end?:   string;
}