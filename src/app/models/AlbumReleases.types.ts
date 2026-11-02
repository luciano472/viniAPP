export interface AlbumReleases {
    id:                   string;
    releases:             Release[];
    firstReleaseDate:     string;
    primaryType:          string;
    title:                string;
}

export interface Release {
    releaseEvents:   ReleaseEvent[];
    barcode:         string;
    disambiguation:  string;
    title:           string;
    date:            string;
}

export interface ReleaseEvent {
    nameArea:   string;
}