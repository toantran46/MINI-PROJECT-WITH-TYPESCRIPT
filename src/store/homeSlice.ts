import { createSlice, createSelector } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserInfo } from "../types/types";
import { dummyData } from "../common/dummyData";
import { GenerateUUid } from "../common/common";

export interface Slice  {
    searchInput: string,
    userInfo: UserInfo[],
    isDarkMode: boolean
}

const initialState: Slice = {
    searchInput: 'Dragon',
    userInfo: dummyData.userInfoDummy,
    isDarkMode: false
}

export const HomeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {
        onSearchChange: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload;
        },
        addNewUser: (state, action: PayloadAction<UserInfo>) => {
            if (action.payload.id){
                const index = state.userInfo.findIndex(item => item.id === action.payload.id);
                if (index > -1) {
                    state.userInfo[index] = {...action.payload}
                }
            } else {
                state.userInfo.push({...action.payload, id: GenerateUUid()});
            }
        },
        removeUser: (state, action: PayloadAction<string | undefined>) => {
            const index = state.userInfo.findIndex(item => item.id === action.payload);
            state.userInfo.splice(index, 1);
        },
        onChangeDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
})



const searchInput = (state: RootState) => state.Slice.searchInput;
const userInfo = (state: RootState) => state.Slice.userInfo;
const isDarkMode = (state: RootState) => state.Slice.isDarkMode;
export const searchInputSelector = createSelector(searchInput, (searchInput) => {
    return searchInput;
});
export const userInfoSelector = createSelector(userInfo, (userInfo) => {
    return userInfo;
});
export const isDarkModeSelector = createSelector(isDarkMode, (isDarkMode) => {
    return isDarkMode;
});

export default HomeSlice.reducer;
export const { onSearchChange, addNewUser, removeUser, onChangeDarkMode } = HomeSlice.actions;