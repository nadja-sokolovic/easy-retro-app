import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
  newSprintPopupState: boolean;
  addNewItemPopupState: boolean;
  deleteItemPopupState: boolean;
  globalPopupErrorState: boolean;
  addNewItemProgressPopupState: boolean;
}

const initialState: PopupState = {
  newSprintPopupState: false,
  addNewItemPopupState: false,
  deleteItemPopupState: false,
  globalPopupErrorState: false,
  addNewItemProgressPopupState: false
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers : {
    setNewSprintPopupState: (state: PopupState, action: PayloadAction<boolean>) => {
      state.newSprintPopupState = action.payload;
    },
    setAddNewItemPopupState: (state, action) => {
      state.addNewItemPopupState = action.payload;
    },
    setDeleteItemPopupState: (state, action) => {
      state.deleteItemPopupState = action.payload;
    },
    setGlobalPopupErrorState: (state, action) => {
      state.globalPopupErrorState = action.payload;
    },
    setAddNewItemProgressPopupState: (state, action) => {
      state.addNewItemProgressPopupState = action.payload;
    }
  }
});

export const {
  setNewSprintPopupState,
  setAddNewItemPopupState, 
  setDeleteItemPopupState, 
  setGlobalPopupErrorState, 
  setAddNewItemProgressPopupState
} = popupSlice.actions;
export default popupSlice.reducer;