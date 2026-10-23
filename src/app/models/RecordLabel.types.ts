export interface Empty {
    created: Date;
    count:   number;
    offset:  number;
    labels:  Label[];
}

export interface Label {
    id:              string;
    type?:           string;
    score:           number;
    name:            string;
    labelCode?:   number;
    disambiguation?: string;
    country?:        string;
    area?:           Area;
    lifeSpan:     LabelLifeSpan;
    aliases?:        Alias[];
    tags?:           Tag[];
}

export interface Alias {
    name:         string;
    locale:       null | string;
    type:         string | null;
    primary:      boolean | null;
    beginDate: null | string;
    endDate:   null | string;
}

export interface Area {
    id:          string;
    type:        string;
    name:        string;
}

export interface LabelLifeSpan {
    begin?: string;
    ended:  boolean | null;
    end?:   string;
}

export interface Tag {
    count: number;
    name:  string;
}