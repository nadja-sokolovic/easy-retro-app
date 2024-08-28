import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormObject } from "models/form.model";

interface FormState {
  formData: FormObject,
  errors: FormObject
}

const initialState: FormState = {
  formData: {},
  errors: {}
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers : {
    initializeForm(state, action: PayloadAction<FormObject>) {
      state.formData = action.payload;
      state.errors = Object.keys(action.payload).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as FormObject);
    },
    updateFormData(state, action: PayloadAction<{ name: string; value: string }>) {
      state.formData[action.payload.name] = action.payload.value;
    },
    updateErrors(state, action: PayloadAction<FormObject>) {
      state.errors = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
      state.errors = initialState.errors;
    }
  }
});

export const {initializeForm, updateFormData, updateErrors, resetForm} = formSlice.actions;
export default formSlice.reducer;