import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularPets: [],
  newPets: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularPets(state, action) {
      //state: initial state
      state.popularPets = action.payload;
    },
    setNewPets(state, action) {
      state.newPets = action.payload;
    },
    setTopUsers(state, action) {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularPets, setNewPets, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;

//slice.ts => index.ts