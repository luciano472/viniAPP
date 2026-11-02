export interface Label {
    id:              string;
    type?:           string;
    name:            string;
    disambiguation?: string;
    country?:        string;
    lifeSpan:        LabelLifeSpan;
    tags?:           Tag[];
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