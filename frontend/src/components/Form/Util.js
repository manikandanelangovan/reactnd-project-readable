import React from 'react';

const renderText = ({
    input,
    placeholder,
    type,
    meta: {touched, error}
  }) => {
  return (
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      { touched && error && <div className='Form-error'>{error}</div>}
    </div>
  );
}

const renderTextarea = ({
    input,
    placeholder,
    meta: {touched, error}
  }) => {
  return (
    <div>
      <textarea {...input} placeholder={placeholder}  />
      { touched && error && <div className='Form-error'>{error}</div>}
    </div>
  );
}

const renderSelect = ({
    input,
    options,
    meta: {touched, error}
  }) => {
  const renderOptions = (options) => options.map((option) => {
    return (
      <option key={option} value={option}>{option}</option>
    );
  })

  return (
    <div className='Form-select'>
      <select {...input}>
      { renderOptions(options)}
      </select>
      { touched && error && <div className='Form-error'>{error}</div>}
    </div>
  );
}

export {renderText, renderTextarea, renderSelect};
