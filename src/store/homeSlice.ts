import { createSlice, createSelector } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserInfo } from "../types/types";
import { GenerateUUid } from "../common/common";
import { dummyData } from "../common/dummyData";

export interface Search  {
    searchInput: string,
    userInfo: UserInfo[]
}

const initialState: Search = {
    searchInput: 'Dragon',
    userInfo: dummyData.userInfoDummy
}

export const HomeSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        onSearchChange: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload;
        },
        addNewUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo.push({...action.payload, id: GenerateUUid()});
            console.log(state.userInfo);
            
        },
        removeUser: (state, action: PayloadAction<string | undefined>) => {
            const index = state.userInfo.findIndex(item => item.id === action.payload);
            state.userInfo.splice(index, 1)
        },
    },
})

const searchInput = (state: RootState) => state.Search.searchInput;
const userInfo = (state: RootState) => state.Search.userInfo;
export const searchInputSelector = createSelector(searchInput, (searchInput) => {
    return searchInput;
});
export const userInfoSelector = createSelector(userInfo, (userInfo) => {
    return userInfo;
});

export default HomeSlice.reducer;
export const { onSearchChange, addNewUser, removeUser } = HomeSlice.actions;