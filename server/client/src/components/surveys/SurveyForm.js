// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    //helper function
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
            );
        });
        // this is the less complicated way of creating the form fields. The above method uses a
        // map function to iterate through an array that holds the unique values of the fields.
        // return (
        //     <div>
        //         <Field key={name} label="Survey Title" type="text" name="title" component={SurveyField} />
        //         <Field key={name} label="Subject Line" type="text" name="subject" component={SurveyField} />
        //         <Field key={name} label="Email Body" type="text" name="body" component={SurveyField} />
        //         <Field key={name} label="Recipient List" type="text" name="emails" component={SurveyField} />
        //     </div>
        // );
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                   <Link to="/surveys" className="red btn-flat white-text">
                   Cancel
                   </Link>
                   <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate (values) {
    const errors = {};
    // the foreach function drys the code below
    // if(!values.title) {
    //     errors.title = 'You must provide a title';
    // }

    // if(!values.subject) {
    //     errors.subject = 'You must provide a subject';
    // }

    // if(!values.body) {
    //     errors. body = 'You must provide a body';
    // }
    
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount:  false
})(SurveyForm);