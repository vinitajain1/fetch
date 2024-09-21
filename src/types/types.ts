//Data Types
export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string,
    favorited:boolean,
    location?:Location
}
export interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

//custom application types
export interface FilterObj{
    breeds?:string[],
    zipCodes?:string[],
    ageMin?:number,
    ageMax?:number,
    size?:number,
    from?:number,
    sort?:string
}

export interface FavoritesState{
    dogs:Dog[]
}

export enum LoadingStatus {
    LOADING = "LOADING",
    LOADED = "LOADED",
    FAILED = "FAILED",
    IDLE = "IDLE",
}

export interface AppState{
    dogs:Dog[],
    next:string,
    prev:string,
    total:number,
    filterObj:FilterObj
    status:LoadingStatus
    error: string | null
}

export enum Severity{
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

export interface NotificationSnackbarState{
    open:boolean,
    message:string,
    severity: Severity
}

//API Response types

export interface DogIdsResponse {
    resultIds: string[];
    next: string | null;
    prev:string | null;
    total: number;
}

export interface LocationsSearchListResponse{
    results:Location[];
    total:number
}

export type Cursor = number;

export type BreedsResponse = string[]; 