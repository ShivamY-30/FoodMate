import {createSlice} from "@reduxjs/toolkit";




const url = "http://localhost/8000/";



const food_listSlice = createSlice({
    name: 'food_list',
    initialState: [],   
    reducers: {
      addInitialItems: (state, action) => {
        return action.payload; // Update state with fetched data
      }
    }
  });
  
export const { addInitialItems } = food_listSlice.actions;
  
export default food_listSlice.reducer;
