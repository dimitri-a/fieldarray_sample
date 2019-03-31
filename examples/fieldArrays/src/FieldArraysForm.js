import React,{Component} from 'react'
import { Field, FieldArray, reduxForm,getFormValues,change } from 'redux-form'
import {connect} from 'react-redux'
import { CalcTotal } from './calculationHelper';



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

class FieldArraysForm extends Component{

render(){
  const { handleSubmit, formValues,setTotal } = this.props

   debugger
   if (formValues) {
    console.log('formvalues', formValues);
     const test = CalcTotal(2000);
     console.log('calc=', test);
     debugger;
     setTotal('total', test);
   }

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
        <button type="submit" >
          Submit
        </button>
      
      </div>
    </form>
  )
}
}



const mapStateToProps = (state) => ({
  formValues: getFormValues('fieldArrays')(state)
});

const mapDispatchToProps = (dispatch) => ({
  setTotal: total => dispatch(change('fieldArrays', 'total', total)),
  
})

const Example = reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
})(FieldArraysForm)

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Example);

export default ConnectedForm
