import React, { useEffect } from 'react';
import Button from '../Button/Button';
import { FormObject, InputProps } from 'models/form.model';
import { SelectData } from 'models/helper.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { initializeForm, updateErrors, updateFormData } from 'store/slices/formSlice';

interface FormProps {
  initialFormObject: FormObject;
  inputs: Array<InputProps>;
  onSubmitForm: (param: FormObject) => void;
}

const Form: React.FC<FormProps> = ({initialFormObject, inputs, onSubmitForm}) => {
  const dispatch = useDispatch();
  const sprints = useSelector((state: RootState) => state.sprints.sprints);
  const formData = useSelector((state: RootState) => state.form.formData);
  const errors = useSelector((state: RootState) => state.form.errors);

  useEffect(() => {
    if (initialFormObject) {
      dispatch(initializeForm(initialFormObject)); // Initialize form with dynamic data
    }
  }, [dispatch, initialFormObject]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    dispatch(updateFormData({ name, value }));

    // Clear error for the changed field
    dispatch(updateErrors({
      ...errors,
      [name]: ''
    }));
  };

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if(formData) {
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if(value === '')
          newErrors[key] = 'Field is required';
      });
  
      if(formData.sprint && sprints.length) {
        if(sprints.find((elem: SelectData) => Number(elem.value) === Number(formData.sprint))) {
          // user enters a sprint that already exists
          newErrors.sprint = 'Sprint already exists';
        }
      }
    }

    return newErrors;
  };

  const handleSubmitForm = (): void => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      dispatch(updateErrors(validationErrors));
    } else {
      onSubmitForm(formData);
    }
  }
  
  return (
    <form className='form-container'>
      <div className='fx-direction-column-start align-items-start'>
        {inputs && inputs.length > 0 ? (
          inputs.map((inputData, index) => (
            <div key={index} className='mb-12'>
              <span className='label w-500 fs-16 orange mb-12'>{inputData.inputLabel}</span>
              <input
                className='mb-12 w-100-p'
                type={inputData.inputType}
                id={inputData.inputId}
                name={inputData.inputName}
                value={formData['inputName']}
                onChange={handleChange}
              />
              {errors[inputData.inputName] && <span className="label fs-14 w-500 light-red mb-12">{errors[inputData.inputName]}</span>}
            </div>
          ))
        ) : (
          <span className='label w-800 fs-16 orange'>No inputs in this form</span>
        )}
      </div>
      <Button btnStyle='primary-btn' btnText='Create New Item' onBtnClick={handleSubmitForm}/>
    </form>
  )
}

export default Form;