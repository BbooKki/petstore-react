import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newPets: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes(state, action) {
      //state: initial state
      state.popularDishes = action.payload;
    },
    setNewPets(state, action) {
      state.newPets = action.payload;
    },
    setTopUsers(state, action) {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularDishes, setNewPets, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;

//slice.ts => index.ts