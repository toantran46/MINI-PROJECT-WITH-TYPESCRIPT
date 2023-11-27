import { createSlice, createSelector } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Search  {
    searchInput: string
}
const initialState: Search = {
    searchInput: ''
}

export const HomeSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        onSearchChange: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload;
        },
    },
})

const searchInput = (state: RootState) => state.Search.searchInput;
export const searchInputSelector = createSelector(searchInput, (searchInput) => {
    console.log("search input");

    return searchInput;
});

export default HomeSlice.reducer;
export const { onSearchChange } = HomeSlice.actions;