import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectData } from "models/helper.model";

interface SelectState {
  selects: {
    [id: string]: {
      selectedValue: string | number,
      items: Array<SelectData>,
      isOpened: boolean,
    };
  };
}

const initialState: SelectState = {
  selects: {}
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers : {
    initializeSelect(state, action: PayloadAction<{ id: string, label: string | number, items: Array<SelectData> }>) {
      const {id, label, items} = action.payload;
      state.selects[id] = {
        selectedValue: label,
        items,
        isOpened: false,
      };
    },
    setSelectedValue: (state: SelectState, action: PayloadAction<{id: string, value: string | number}>) => {
      const {id, value} = action.payload;
      state.selects[id].selectedValue = value;
    },
    setItems: (state: SelectState, action: PayloadAction<{id: string, items: Array<SelectData>}>) => {
      const {id, items} = action.payload;
      state.selects[id].items = items;
    },
    changeSelectState: (state: SelectState, action: PayloadAction<{id: string, isOpened: boolean}>) => {
      const {id, isOpened} = action.payload;
      state.selects[id].isOpened =isOpened;
    }
  }
});

export const {initializeSelect, setSelectedValue, setItems, changeSelectState} = selectSlice.actions;
export default selectSlice.reducer;