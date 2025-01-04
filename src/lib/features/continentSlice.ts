import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetContinentsWithCountriesType, GetContinentWithCountriesType, GetCountriesAndLanguagesType } from "@/types/queries";

// Define the type for the slice state
interface ContinentState {
  selectedContinentCode: string;
  allContinentsData: GetContinentsWithCountriesType | undefined;
  selectedContinentData: GetContinentWithCountriesType | undefined;
  allContinentsLanguageCount: GetCountriesAndLanguagesType | undefined
  loading: boolean;
  error: string | null;
}

const initialState: ContinentState = {
  selectedContinentCode: "all",
  allContinentsData: undefined,
  selectedContinentData: undefined,
  allContinentsLanguageCount: undefined,
  loading: false,
  error: null,
};

const continentSlice = createSlice({
  name: "continent",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAllContinentsData: (state, action: PayloadAction<GetContinentsWithCountriesType | undefined>) => {
      state.allContinentsData = action.payload;
    },
    setSelectedContinentData: (state, action: PayloadAction<GetContinentWithCountriesType | undefined>) => {
      state.selectedContinentData = action.payload;
    },
    setSelectedContinentCode: (state, action: PayloadAction<string>) => {
      state.selectedContinentCode = action.payload;
    },
    setAllContinentsLanugageCount: (state, action: PayloadAction<GetCountriesAndLanguagesType | undefined>) => {
      state.allContinentsLanguageCount = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setAllContinentsData,
  setSelectedContinentData,
  setSelectedContinentCode,
  setAllContinentsLanugageCount,
} = continentSlice.actions;

export default continentSlice.reducer;
