import {createSlice} from "@reduxjs/toolkit";
import { menu_list } from "../assets/assets";

const menuListSlice = createSlice({
    name : 'menuListSlice',
    initialState : menu_list,
    reducers  : {
        addInitialItems: (state , action)=>{
            return state
        }
    }
})

export const menuListSliceAction = menuListSlice.actions;

export default menuListSlice
