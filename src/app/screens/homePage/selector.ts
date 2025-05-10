import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrievePopularPets = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularPets
);

export const retrieveNewPets = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newPets
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
