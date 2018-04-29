// EnrollmentForm shows a form for a doctor to input a patient into the system
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import EnrollmentField from './EnrollmentField';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';

class EnrollmentForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					component={EnrollmentField}
					type="text"
					label={label}
					name={name}
					key={name}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.props.onEnrollmentFormSubmit)}
				>
					{this.renderFields()}
					<Link to="/dashboard" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">navigate_next</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipient = validateEmail(values.recipient || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide - ${name}`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'enrollmentForm',
	destroyOnUnmount: false
})(EnrollmentForm);
