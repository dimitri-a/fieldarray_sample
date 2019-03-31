import React, { Component } from 'react';
import { Field, reduxForm,change ,getFormValues} from 'redux-form';
import { connect } from 'react-redux';

class SelectingFormValuesForm extends Component {
    // ...




    componentWillReceiveProps(nextProps) {
        //debugger
        const nextValues = nextProps.values;
        const values = this.props.values;
        console.log('nextpreos',nextProps.formValues)
        debugger

        // if at least one of the form values changed

    }

    // handleChange(){
    //     // debugger
    //     // console.log('handlechange',lastName)
    //     debugger
    //     console.log('formvalues=',this.props.formValues)
        
    // }

    render() {
        const { favoriteColorValue,
            fullName,
            handleSubmit,
            hasEmailValue,
            pristine,
            reset,
            submitting,
            changeName,
            formValues
         } = this.props

         //debugger
         if (formValues) {
           // console.log('formvalues', formValues);
            //const test = calculateEbitda(2000, formValues.adjustments);
            //console.log('calc=', test);
            //debugger;
            //change('adjustedEbitda_assessed', test);
          }



        return <form onSubmit={handleSubmit}>
            <div>
                <button onClick={() => changeName('Harry')}>change to Harry</button>
                <label>First Name</label>
                <div>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                    />
                </div>
            </div>
            <div>
                <label>Last Name</label>
                <div>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                       
                    />
                </div>
            </div>
            
           
            <div>
                <label>Favorite Color</label>
                <div>
                    <Field name="favoriteColor" component="select">
                        <option />
                        <option value="#ff0000">Red</option>
                        <option value="#00ff00">Green</option>
                        <option value="#0000ff">Blue</option>
                    </Field>
                </div>
            </div>
           
                <div
                    style={{
                        height: 80,
                        width: 200,
                        margin: '10px auto',
                        backgroundColor: favoriteColorValue
                    }}
                />
        
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit {fullName}
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
          </button>
                <button type="button" onClick={this.changeStuff}>
                    Change first name
          </button>
            </div>
        </form>
    }
};

const mapStateToProps = (state) => ({
    formValues: getFormValues('selectingFormValues')(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeName: name => dispatch(change('selectingFormValues', 'firstName', name)),
    
})

const Example =reduxForm({
    form: 'selectingFormValues' ,// a unique name for this form
})(SelectingFormValuesForm);

const ConnectedForm = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Example);
  
  export default ConnectedForm