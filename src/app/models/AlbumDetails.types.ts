export interface Details {
    releaseCount:  number;
    releases:      AlbumDetails;
    releaseOffset: number;
}

export interface AlbumDetails {
    id:                    string;
    barcode:               string;
    date:                  string;
    disambiguation:        string;
    country:               string;
    title:                 string;
    media:                 MediaDetails[];
}

export interface MediaDetails {
    tracks:         Track[];
    trackCount:     number;
    format:         string;
    position:       number;
    title:          string;
}

export interface Track {
    length:           number;
    title:            string;
    position:         number;
    number:           string;
    firstReleaseDate: string;
}