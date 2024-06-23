import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8000/";

export const fetchItems = createAsyncThunk(
  'food_list/fetchItems',
  async () => {
    const response = await axios.get(url + "api/food/list");
    return response.data.data;
  }
);
