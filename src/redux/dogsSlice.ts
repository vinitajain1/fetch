import { createSlice } from "@reduxjs/toolkit";
import {
    UpdateZipCodesPayload,
    UpdateDogLocationPayload,
    UpdateCityPayload,
    UpdateStatePayload,
    UpdateSelectedBreedsPayload,
    UpdateSortValuePayload,
    UpdateMinMaxAgePayload,
    ToggleDogAsFavoritePayload,
    FetchingDogsSuccessPayload,
    FetchingResponseFailedPayload,
} from "../types/action-types";
import { AppState, LoadingStatus, Location } from "../types/types";

// Initial state
export const initialState: AppState = {
    status: LoadingStatus.IDLE,
    dogs: [],
    next: '',
    prev: '',
    total: 0,
    error: null,
    locationSearchParams: {
        city: '',
        states: null,
    },
    filterObj: {
        breeds: [],
        zipCodes: [],
        ageMin: 0,
        ageMax: 15,
        size: 25,
        from: 0,
        sort: 'breed:asc',
    },
};

const dogSlice = createSlice({
    name: 'dogsSlice',
    initialState,
    reducers: {
        updateZipCodes: (state, action: { payload: UpdateZipCodesPayload }) => {
            if (action.payload) {
                state.filterObj.zipCodes = action.payload;
            }
        },
        updateDogLocation: (state, action: { payload: UpdateDogLocationPayload }) => {
            if (action.payload) {
                state.dogs = state.dogs.map((dog) => {
                    dog.location = action.payload.find((location:Location) => dog?.zip_code === location?.zip_code);
                    return dog;
                });
            }
        },
        updateCity: (state, action: { payload: UpdateCityPayload }) => {
            state.locationSearchParams.city = action.payload || '';
        },
        updateState: (state, action: { payload: UpdateStatePayload }) => {
            state.locationSearchParams.states = action.payload || [];
        },
        updateSelectedBreeds: (state, action: { payload: UpdateSelectedBreedsPayload }) => {
            state.filterObj.breeds = action.payload || [];
        },
        updateSortValue: (state, action: { payload: UpdateSortValuePayload }) => {
            state.filterObj.sort = action.payload || 'breed:asc';
        },
        updateMinMaxAge: (state, action: { payload: UpdateMinMaxAgePayload }) => {
            if (action.payload) {
                state.filterObj.ageMin = action.payload[0] || 0;
                state.filterObj.ageMax = action.payload[1] || 15;
            }
        },
        toggleDogAsFavorite: (state, action: { payload: ToggleDogAsFavoritePayload }) => {
            state.dogs = state.dogs.map(dog =>
                dog.id === action.payload.id ? { ...dog, favorited: !dog.favorited } : dog
            );
        },
        fetchingDogsStarted: (state) => {
            state.status = LoadingStatus.LOADING;
            state.error = null;
        },
        fetchingDogsSuccess: (state, action: { payload: FetchingDogsSuccessPayload }) => {
            state.status = LoadingStatus.LOADED;
            state.error = null;
            state.dogs = action.payload.dogs;
            state.next = action.payload.next;
            state.total = action.payload.total;
        },
        fetchingResponseFailed: (state, action: { payload: FetchingResponseFailedPayload }) => {
            state.status = LoadingStatus.FAILED;
            state.error = action.payload;
        },
    },
});

// Export actions and reducer
export const {
    fetchingResponseFailed,
    fetchingDogsStarted,
    fetchingDogsSuccess,
    toggleDogAsFavorite,
    updateZipCodes,
    updateCity,
    updateState,
    updateSelectedBreeds,
    updateMinMaxAge,
    updateSortValue,
    updateDogLocation,
} = dogSlice.actions;

export default dogSlice.reducer;
