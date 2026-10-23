export interface Details {
    releaseCount:  number;
    releases:         AlbumDetails;
    releaseOffset: number;
}

export interface AlbumDetails {
    status:                string;
    id:                    string;
    barcode:               string;
    date:                  string;
    disambiguation:        string;
    asin:                  null | string;
    country:               string;
    title:                 string;
    packaging:             null | string;
    media:                 MediaDetails[];
    quality:               string;
}

export interface MediaDetails {
    trackOffset: number;
    tracks:         Track[];
    trackCount:  number;
    format:         string;
    id:             string;
    position:       number;
    title:          string;
}

export interface Track {
    recording: Recording;
    length:    number;
    title:     string;
    id:        string;
    position:  number;
    number:    string;
}

interface Recording {
    length:               number;
    title:                string;
    disambiguation:       string;
    id:                   string;
    firstReleaseDate: string;
    video:                boolean;
}