import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

export interface CounterState {
  conversionData: {
    productName: string;
    customerName: string;
    dayOfWeak: string;
    materialCD: string;
    calSettings: string;
    bagCalStandardUnit: string;
    kilo: string;
    counterUnit: string;
    loss: string;
    date: Dayjs | string | Date;
  };
}

const initialState: CounterState = {
  conversionData: {
    productName: "",
    customerName: "",
    dayOfWeak: "",
    materialCD: "",
    calSettings: "",
    bagCalStandardUnit: "",
    kilo: "",
    counterUnit: "",
    loss: "",
    date: dayjs(null),
  },
};

export const conversionTableSlice = createSlice({
  name: "conversionData",
  initialState,
  reducers: {
    setConversionData: (state, action) => {
      state.conversionData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConversionData } = conversionTableSlice.actions;

export default conversionTableSlice.reducer;
