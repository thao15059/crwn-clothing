import { createSelector } from "reselect";

const selectDirectory = (state) => state.directoryReducer;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
