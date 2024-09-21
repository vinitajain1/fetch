import { Dog, Location, Severity } from "./types";

// Action payload types
export type UpdateZipCodesPayload = string[];
export type UpdateDogLocationPayload = Location[];
export type UpdateCityPayload = string;
export type UpdateStatePayload = string[];
export type UpdateSelectedBreedsPayload = string[];
export type UpdateSortValuePayload = string;
export type UpdateMinMaxAgePayload = [number, number];
export type ToggleDogAsFavoritePayload = { id: string };

export type FetchingDogsSuccessPayload = {
    dogs: Dog[];
    next: string;
    total: number;
};

export type FetchingResponseFailedPayload = string;

export type ShowSnackbarPayload = {
    message?:string,
    open:boolean,
    severity?:Severity
}
