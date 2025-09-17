export interface Perfume {
    _id?: string,
    name: string,
    description: string,
    concentration_id: string,
    brand: string,
    gender: string,
    image_url: string   
}

interface PerfumeNote {
    _id: string;
    name: string;
    image_url: string;
    note_type: string;
}

export interface PerfumeDetail extends Perfume {
    notes: PerfumeNote[];
}

interface AddPerfume {
    note_id: string,
    note_type: string
}

export interface PerfumeAdd extends Perfume {
    notes: AddPerfume[];
}


