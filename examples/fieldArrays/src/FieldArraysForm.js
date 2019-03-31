import React, { Component, Fragment } from 'react'
import { Field, FieldArray, reduxForm, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import { CalcTotal } from './calculationHelper';
import _ from 'lodash';



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
  <Fragment>
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

    <Field
      name="total"
      type="number"
      component="input"
      label="Total modifications"
      text="0"
    />

  </Fragment>
)


const isArrayEqual = function (x, y) {
  return _(x).differenceWith(y, _.isEqual).isEmpty();
};

class FieldArraysForm extends Component {


  componentDidMount() {
    this.props.change('fieldArraysForm', 'total', 10)
  }





componentDidUpdate(prevProps) {

  // let te
  // debugger
  // if (prevProps.formValues && prevProps.formValues.mods && this.props.formValues && this.props.formValues.mods)
  // {
  //   te = isArrayEqual(prevProps.formValues.mods, this.props.formValues.mods)
  // }
  
  // console.log(te)
  // debugger

  // if (te ) {
  //   test = CalcTotal(Number(this.props.formValues.mods));
  //   console.log('calc=', test);
  //   this.props.change("fieldArraysForm", "total", test);
  // }


  // if (typeof (prevProps.formValues) !== 'undefined' && this.props.formValues !== prevProps.formValues) {
  //   this.props.change("fieldArraysForm", "total", test);
  // }
}

// shouldComponentUpdate(nextProps, nextState) {
//   debugger
//   if (!this.props) return true
//   if (!nextProps.formValues) return true
//   return this.props.formValues.total !== nextProps.formValues.total;
// }

render() {
  const { handleSubmit } = this.props

  return (
    <form onSubmit={handleSubmit}>

      {/* <button onClick={this.changeStuff}>set total</button> */}

      <FieldArray name="mods" component={renderMods} />




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
  formValues: getFormValues('fieldArraysForm')(state),
});

const mapDispatchToProps = {
  change
};


// const Example = reduxForm({
//   form: 'fieldArraysForm', // a unique identifier for this form
// })(FieldArraysForm)

// const ConnectedForm = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Example);

// export default ConnectedForm

export default reduxForm({
  form: "fieldArraysForm"
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FieldArraysForm)
);

