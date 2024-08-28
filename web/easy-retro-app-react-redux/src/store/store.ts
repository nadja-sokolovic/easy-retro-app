// store.ts
import { configureStore } from '@reduxjs/toolkit';
import sprintReducer from './slices/sprintSlice';
import popupReducer from './slices/popupSlice';
import menuItemsReducer from './slices/menuItemsSlice';
import formReducer from './slices/formSlice';
import selectReducer from './slices/selectSlice';
import itemsReducer from './slices/itemsSlice';

const store = configureStore({
  reducer: {
    sprints: sprintReducer,
    popup: popupReducer,
    menuItems: menuItemsReducer,
    form: formReducer,
    select: selectReducer,
    items: itemsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
