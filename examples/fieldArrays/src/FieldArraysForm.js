import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderMods = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Modification
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((mod, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Mod"
          onClick={() => fields.remove(index)}
        />
        <h4>Mod #{index + 1}</h4>
        <Field
          name={`${mod}.lastYear`}
          type="number"
          component={renderField}
          label="Last Year"
        />
        <Field
          name={`${mod}.currentYear`}
          type="number"
          component={renderField}
          label="Current Year"
        />



        <Field name={`${mod}.type`} component="select" label="Type">
          <option />
          <option value="-">Expense</option>
          <option value="+">Income</option>
          <option value="-">Tax</option>
        </Field>


      </li>
    ))}
  </ul>
)

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>

      <FieldArray name="mods" component={renderMods} />

      <Field
          name="result"
          type="number"
          component="label"
          label="Result calculation"
        />

      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate
})(FieldArraysForm)
