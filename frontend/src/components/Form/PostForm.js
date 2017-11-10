import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {renderText, renderTextarea, renderSelect} from './Util';

const validate = values => {
  const errors = {}
  if (!values.body) {
    errors.body = 'Required';
  } else if (values.body.length < 10) {
    errors.body = "Enter at least 10 characters.";
  }

  if (!values.author) {
    errors.author = 'Required';
  } else if (values.author.length < 2) {
    errors.author = 'Must be at least 2 characters.';
  }

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 2) {
    errors.title = 'Must be at least 2 characters.';
  }

  if (!values.category) {
    errors.category = 'Required';
  }

  return errors
}

const PostForm = props => {
  const {handleSubmit, categories, pristine, reset, submitting} = props;

  const options = categories.map((category) => {
    return category.name;
  })

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div className='Form-group'>
        <label className='Form-label'>Title</label>
        <div>
          <Field
            name="title"
            component={renderText}
            type="text"
            placeholder="Title"
          />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Body</label>
        <div>
          <Field
            name="body"
            component={renderTextarea}
           />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Category</label>
        <div>
          <Field
            name="category"
            component={renderSelect}
            options={options}
          />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Author</label>
        <div>
          <Field
            name="author"
            component={renderText}
            type="text"
            placeholder="Your Name"
          />
        </div>
      </div>

      <div className='Form-group'>
        <button  className='Button' type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button className='Button' type="button" disabled={pristine || submitting} onClick={reset}>
          Reset
        </button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'post',
  validate
})(PostForm);
