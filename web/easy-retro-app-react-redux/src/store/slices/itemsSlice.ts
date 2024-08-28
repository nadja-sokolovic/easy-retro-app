import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemModel, ItemsBySprint } from 'models/item.model';
import { ReportsBySprint } from 'models/report.model';
import { FunctionHelpers } from 'utils/helpers/functions.helper';

interface ItemState {
  item: ItemModel | null;
  itemType: string;
  easyItems: Array<ItemsBySprint>;
  easyProgressItems: Array<ItemsBySprint>;
  reports: Array<ReportsBySprint>;
}

const initialState: ItemState = {
  item: null,
  itemType: '',
  easyItems: [],
  easyProgressItems: [],
  reports: []
};

const sprintSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItem : (state: ItemState, action: PayloadAction<ItemModel>) => {
      state.item = action.payload;
    },
    setItemType : (state: ItemState, action: PayloadAction<string>) => {
      state.itemType = action.payload;
    },
    setEasyItemsForSprint: (state: ItemState, action: PayloadAction<ItemsBySprint>) => {
      state.easyItems = [...state.easyItems, action.payload];
    },
    setEasyProgressItemsForSprint: (state: ItemState, action: PayloadAction<ItemsBySprint>) => {
      state.easyProgressItems = [...state.easyProgressItems, action.payload];
    },
    deleteItemFromState: (state: ItemState, action: PayloadAction<{key: 'easyItems' | 'easyProgressItems', type: string, itemId: number, sprint: number}>) => {
      const {key, type, sprint, itemId} = action.payload;

      const sprintIndex = state[key].findIndex((sprintItem) => sprintItem.sprint === sprint);
      if (sprintIndex !== -1) {
        const itemsByType = state[key][sprintIndex].items[type];
        
        if (itemsByType) {
          // Filter out the item with the specified itemId
          state[key][sprintIndex].items[type] = itemsByType.filter((item: ItemModel) => item.itemId !== itemId);
        }
      }
    },
    addItemToState: (state: ItemState, action: PayloadAction<{key: 'easyItems' | 'easyProgressItems', item: ItemModel, type: string, sprint: number}>) => {
      const {key, item, type, sprint} = action.payload;

      const sprintIndex = state[key].findIndex((sprintItem) => sprintItem.sprint === sprint);
      if (sprintIndex !== -1) {
        const itemsByType = state[key][sprintIndex].items[type];
        if (itemsByType) {
          // Insert a new item to the existing array
          state[key][sprintIndex].items[type] = [...itemsByType, item];
        }
      } else {
        // Insert a new element to the main array
        const newElement = FunctionHelpers.organizeItemsBySprint([item]);
        if(newElement)
          state[key].push(newElement);
      }
    },
    addReactionToItem: (state: ItemState, action: PayloadAction<{key: 'easyItems' | 'easyProgressItems', type: string, itemId: number, reactionType: 'likeCount' | 'dislikeCount', sprint: number}>) => {
      const {key, type, itemId, reactionType, sprint} = action.payload;

      const sprintIndex = state[key].findIndex((sprintItem) => sprintItem.sprint === sprint);
      if (sprintIndex !== -1) {
        const itemsByType = state[key][sprintIndex].items[type];
        if (itemsByType) {
          // Update reactions for the item
          state[key][sprintIndex].items[type] = itemsByType.map((item: ItemModel) => {
            if(item.itemId === itemId) {
              const prevReactions = item.reactions;
              const updatedItem = {
                ...item,
                reactions: {
                  ...prevReactions,
                  [reactionType]: prevReactions[reactionType] + 1
                }
              }
              return updatedItem;
            }
            return item;
          })
        } 
      }
    },
    updateItemText: (state: ItemState, action: PayloadAction<{type: string, newItem: ItemModel, sprint: number}>) => {
      const {type, newItem, sprint} = action.payload;

      const sprintIndex = state.easyProgressItems.findIndex((sprintItem) => sprintItem.sprint === sprint);
      if (sprintIndex !== -1) {
        const itemsByType = state.easyProgressItems[sprintIndex].items[type];
        if (itemsByType) {
          // Update item text
          state.easyProgressItems[sprintIndex].items[type] = itemsByType.map((item: ItemModel) => (item.itemId === newItem.itemId ? newItem : item));
        } 
      }
    },
    setReportForSprint: (state: ItemState, action: PayloadAction<ReportsBySprint>) => {
      state.reports = [...state.reports, action.payload];
    }
  },
});

export const { 
  setItem,
  setItemType,
  setEasyItemsForSprint,
  setEasyProgressItemsForSprint, 
  deleteItemFromState,
  addItemToState ,
  addReactionToItem,
  updateItemText,
  setReportForSprint
} = sprintSlice.actions;
export default sprintSlice.reducer;