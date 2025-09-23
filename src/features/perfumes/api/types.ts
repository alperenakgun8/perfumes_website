export interface SelectedNote {
    note_id: string;
    note_type: "TOP" | "MIDDLE" | "BASE";
}

interface PerfumeNote {
    _id: string;
    name: string;
    image_url: string;
    note_type: string;
}

export interface Perfume {
    _id?: string,
    name: string,
    description: string,
    concentration_id: string,
    brand: string,
    gender: string,
    image_url: string   
}

export interface PerfumeAdd extends Perfume {
    notes: SelectedNote[];
}

export interface PerfumeDetail {
     _id: string,
    name: string,
    description: string,
    concentration_id: {_id: string, name: string, display_name: string},
    brand: string,
    gender: string,
    image_url: string   
    notes: PerfumeNote[]
}

export interface GeneralPerfumeInfo {
    _id: string,
    brand: string
    name: string,
    image_url: string
}
