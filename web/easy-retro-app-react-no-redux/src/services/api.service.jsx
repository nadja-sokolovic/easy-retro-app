import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// GET requests
export const getSprints = async () => {
  try {
    const response = await api.get('/item/sprints');
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const getItemsForTheSprint = async (selectedSprint, category) => {
  try {
    const response = await api.get(`/item/${category}?sprint=${selectedSprint}`);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
}

export const getReportForTheSprint = async (selectedSprint) => {
  try {
    const response = await api.get(`/report/${selectedSprint}`);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
}

// POST requests 
export const addReaction = async (itemId, reactionType) => {
  try {
    await api.post(`/reaction/${itemId}?type=${reactionType}`);
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await api.post('/item', item);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

// PUT requests
export const updateItemType = async (itemId, newType) => {
  try {
    const response = await api.put(`/item/change/type/${itemId}?newType=${newType}`);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

export const updateItem = async (updatedItem) => {
  try {
    const response = await api.put(`/item/${updatedItem.itemId}`, updatedItem);
    return response.data.response;
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

// DELETE requests
export const deleteItem = async (itemId) => {
  try {
    await api.delete(`/item/${itemId}`);
  } catch(error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};

