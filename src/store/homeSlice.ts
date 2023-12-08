import { createSlice} from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./store";
import { UserInfo } from "../entities/types";
import { userInfoDummy } from "../common/dummyData";
import { GenerateUUid } from "../common/common";

export interface UserSlice  {
    searchInput: string,
    userInfo: UserInfo[],
    isDarkMode: boolean
}

const initialState: UserSlice = {
    searchInput: '',
    userInfo: userInfoDummy,
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
            if (index > -1) {
                state.userInfo.splice(index, 1);
            }
        },
        onChangeDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
})

// const searchInput = (state: RootState) => state.UserSlice.searchInput;
// const userInfo = (state: RootState) => state.UserSlice.userInfo;
// const isDarkMode = (state: RootState) => state.UserSlice.isDarkMode;
// export const searchInputSelector = createSelector(searchInput, (searchInput) => {
//     return searchInput;
// });
// export const userInfoSelector = createSelector(userInfo, (userInfo) => {
//     return userInfo;
// });
// export const isDarkModeSelector = createSelector(isDarkMode, (isDarkMode) => {
//     return isDarkMode;
// });

export const useHomeSlice = () => {
    const homeSlice = useAppSelector(store => store.UserSlice);
    const dispatch = useAppDispatch();
    const changeDarkMode = () => {
        dispatch(onChangeDarkMode());
    }
    const changeMovieSearch = (searchInput: string) => {
        dispatch(onSearchChange(searchInput));
    }
    const addNewHomeUser = (userInfo: UserInfo) => {
        dispatch(addNewUser(userInfo));
    }
    const removeHomeUser = (id: string | undefined) => {
        dispatch(removeUser(id));
    }
    return {
        ...homeSlice,
        changeDarkMode,
        changeMovieSearch,
        addNewHomeUser,
        removeHomeUser
    }
}

export default HomeSlice.reducer;
export const { onSearchChange, addNewUser, removeUser, onChangeDarkMode } = HomeSlice.actions;