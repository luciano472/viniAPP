export interface Data {
    created:  Date;
    count:    number;
    offset:   number;
    releases: Album[];
}

export interface Album {
    id:                    string;
    score:                 number;
    count:                 number;
    title:                 string;
    status:                string;
    packaging:             string;
    artistCredit:       ArtistCredit[];
    releaseGroup:       ReleaseGroup;
    date:                  string;
    country:               string;
    barcode:               string;
    trackCount:         number;
    media:                 Media[];
}

export interface ArtistCredit {
    name:   string;
    artist: Artist;
}

interface Artist {
    id:                  string;
    name:                string;
    disambiguation?:     string;
}

export interface Media {
    id:            string;
    format:        string;
    discCount:  number;
    trackCount: number;
}

export interface ReleaseGroup {
    id:                string;
    title:             string;
}