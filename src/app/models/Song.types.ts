export interface Recording {
    id:                   string;
    title:                string;
    length?:              number;
    artistCredit:         ArtistCredit[];
    firstReleaseDate:     string;
    releases:             Release[];
    isrcs?:               string[];
}

export interface ArtistCredit {
    name:       string;
    nameArtist: string;
}

export interface Artist {
    id:                  string;
    name:                string;
    disambiguation?:     string;
}

export interface Release {
    id:                  string;
    title:               string;
    date?:               string;
    country?:            string;
}
