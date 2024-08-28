import axios from 'axios';
import { ItemModel, ItemRequest } from 'models/item.model';
import { ReportModel } from 'models/report.model';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// GET requests
export const getSprints = async (): Promise<Array<number>> => {
  try {
    const response = await api.get('/item/sprints');
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const getItemsForTheSprint = async (selectedSprint: number, category: number): Promise<Array<ItemModel>> => {
  try {
    const response = await api.get(`/item/${category}?sprint=${selectedSprint}`);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
}

export const getReportForTheSprint = async (selectedSprint: number): Promise<ReportModel> => {
  try {
    const response = await api.get(`/report/${selectedSprint}`);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
}

// POST requests 
export const addReaction = async (itemId: number, reactionType: string): Promise<void> => {
  try {
    await api.post(`/reaction/${itemId}?type=${reactionType}`);
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

export const createItem = async (item: ItemRequest): Promise<ItemModel> => {
  try {
    const response = await api.post('/item', item);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

// PUT requests
export const updateItemType = async (itemId: number, newType: string): Promise<ItemModel> => {
  try {
    const response = await api.put(`/item/change/type/${itemId}?newType=${newType}`);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

export const updateItem = async (updatedItem: ItemRequest): Promise<ItemModel> => {
  try {
    const response = await api.put(`/item/${updatedItem.itemId}`, updatedItem);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

// DELETE requests
export const deleteItem = async (itemId: number): Promise<void> => {
  try {
    await api.delete(`/item/${itemId}`);
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

