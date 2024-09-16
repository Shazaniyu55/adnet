import { SWExtra } from "@/lib/types/userInfo";
import { swExtraJSON } from "@/lib/utils/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  swExtra: swExtraJSON() ? swExtraJSON() : ({} as SWExtra),
};

export const getSWExtra = createAsyncThunk(
  "swExtra/get",
  async (userId: string) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:3000/api/users/swExtra/${userId}`,
      });
      const data = await res.data;
      return data;
    } catch (err: any) {
      console.log(err);
      return {};
    }
  }
);

const swExtraSlice = createSlice({
  name: "swExtra",
  initialState,
  reducers: { updateSWExtra: (state) => {
    state.swExtra = swExtraJSON()
  },},
  extraReducers: (builder) => {
    builder.addCase(getSWExtra.fulfilled, (state, action) => {
      const swExtra = action.payload;
      localStorage.setItem("swExtra", JSON.stringify(swExtra));
      state.swExtra = swExtra;
    });
  },
});
export const { updateSWExtra } = swExtraSlice.actions;
export default swExtraSlice.reducer;
