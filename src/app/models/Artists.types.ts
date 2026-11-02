import { Tag } from "./RecordLabel.types";

export interface Artists {
    count:   number;
    artists: Artist[];
}
export interface Artist {
    id:             string;
    type?:          string;
    name:           string;
    country?:       string;
    disambiguation: string;
    lifeSpan:       ArtistLifeSpan;
    tags?:          Tag[];
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