import React, { useState } from 'react';
import Button from '../Button/Button';

const Form = ({formObject, inputs, onSubmitForm, sprints}) => {
  const [formData, setFormData] = useState(formObject);
  const [errors, setErrors] = useState(formObject);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if(value === '')
        newErrors[key] = 'Field is required';
    });

    if(formData.sprint && sprints.length) {
      if(sprints.find((elem) => elem.value === Number(formData.sprint))) {
        // user enters a sprint that already exists
        newErrors.sprint = 'Sprint already exists';
      }
    }

    return newErrors;
  };

  const handleSubmitForm = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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