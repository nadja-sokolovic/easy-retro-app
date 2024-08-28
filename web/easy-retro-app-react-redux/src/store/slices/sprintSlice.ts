import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectData } from 'models/helper.model';

interface SprintState {
  sprints: Array<SelectData>;
  selectedSprint: number;
}

const initialState: SprintState = {
  sprints: [],
  selectedSprint: 0,
};

const sprintSlice = createSlice({
  name: 'sprints',
  initialState,
  reducers: {
    setSprints: (state: SprintState, action: PayloadAction<Array<SelectData>>) => {
      state.sprints = action.payload;
    },
    setSelectedSprint: (state: SprintState, action: PayloadAction<number>) => {
      state.selectedSprint = action.payload;
    }
  },
});

export const { setSprints, setSelectedSprint } = sprintSlice.actions;
export default sprintSlice.reducer;
