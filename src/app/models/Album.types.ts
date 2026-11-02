export interface Data {
    created:  Date;
    count:    number;
    offset:   number;
    releases: Album[];
}

export interface Album {
    id:            string;
    score:         number;
    title:         string;
    artistCredit:  ArtistCredit[];
    releaseGroup:  ReleaseGroup;
    date:          string;
    country:       string;
    barcode:       string;
    media:         Media[];
}

export interface ArtistCredit {
    name:           string;
    disambiguation: string;
}

export interface Media {
    id:            string;
    format:        string;
    discCount:     number;
    trackCount:    number;
}

export interface ReleaseGroup {
    id:        string;
    title:     string;
}