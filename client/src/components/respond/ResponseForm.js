import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ResponseField from './ResponseField';
import responseFormFields from './responseFormFields';

class ResponseForm extends Component {
	renderFields() {
		return _.map(responseFormFields, ({ label, minValue, maxValue }) => {
			return (
				<Field
					component={ResponseField}
					type="radio"
					label={label}
					key={label}
					name={label}
					values={_.range(minValue, maxValue + 1)}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form action="#">
					<p class="range-field">
						<input type="range" id="test5" min="0" max="5" />
					</p>
				</form>
				<form onSubmit={this.props.handleSubmit(this.props.onResponseSubmit)}>
					<table>
						<thead>
							<tr>
								<th>Type</th>
								<th>0 1 2 3 4 5</th>
							</tr>
						</thead>
						<tbody>{this.renderFields()}</tbody>
					</table>
					<Link to="/dashboard" className="red btn-flat white-text">
						{' '}
						Cancel{' '}
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						{' '}
						Next <i className="material-icons right">navigate_next</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(responseFormFields, ({ label }) => {
		if (!values[label]) {
			errors[label] = `Missing response for - ${label}`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'responseForm',
	destroyOnUnmount: false
})(ResponseForm);
