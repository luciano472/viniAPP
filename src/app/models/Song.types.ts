import { ReleaseGroup } from "./Album.types";
import { ReleaseEvent } from "./AlbumReleases.types";

export interface Song {
    created:    Date;
    count:      number;
    offset:     number;
    recordings: Recording[];
}

export interface Recording {
    id:                   string;
    score:                number;
    title:                string;
    length?:              number;
    artistCredit:      ArtistCredit[];
    firstReleaseDate: string;
    releases:             Release[];
    isrcs?:               string[];
}

export interface ArtistCredit {
    name:   string;
    artist: Artist;
}

export interface Artist {
    id:                  string;
    name:                string;
    disambiguation?:     string;
}

export interface Release {
    id:                  string;
    count:               number;
    title:               string;
    status:              string;
    artistCredit?:    ArtistCredit[];
    releaseGroup:     ReleaseGroup;
    date?:               string;
    country?:            string;
    releaseEvents?:   ReleaseEvent[];
    trackCount:       number;
    media:               Media[];
    disambiguation?:     string;
}

export interface Media {
    id:             string;
    position:       number;
    format:         string;
    track:          Track[];
    trackCount:  number;
    trackOffset: number;
}

export interface Track {
    id:      string;
    number:  string;
    title:   string;
    length?: number;
}