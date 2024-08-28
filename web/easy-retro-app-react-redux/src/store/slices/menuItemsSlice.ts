import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItemState {
  selectedItemId: number;
}

const initialState: MenuItemState = {
  selectedItemId: 0
};

const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers : {
    setSelectedItemId: (state: MenuItemState, action: PayloadAction<number>) => {
      state.selectedItemId = action.payload;
    }
  }
});

export const {setSelectedItemId} = menuItemsSlice.actions;
export default menuItemsSlice.reducer;