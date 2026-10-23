export interface AlbumReleases {
    id:                   string;
    releases:             Release[];
    firstReleaseDate: string;
    disambiguation:       string;
    primaryType:       string;
    title:                string;
}

export interface Release {
    quality:               string;
    id:                    string;
    releaseEvents:      ReleaseEvent[];
    barcode:               string;
    disambiguation:        string;
    title:                 string;
    status:                string;
    country:               string;
    packaging:             null | string;
    date:                  string;
}

export interface ReleaseEvent {
    area: Area;
    date: string;
}

export interface Area {
    name:               string;
    type:               null;
    id:                 string;
    disambiguation:     string;
}