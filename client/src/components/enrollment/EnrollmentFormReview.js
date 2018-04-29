import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const EnrollmentFormReview = ({
	onCancel,
	formValues,
	submitEnrollment,
	history
}) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries.</h5>
			{reviewFields}
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}
			>
				<i className="material-icons left">navigate_before</i>
				Back
			</button>
			<button
				className="teal btn-flat white-text right"
				onClick={() => submitEnrollment(formValues, history)}
			>
				Enroll
				<i className="material-icons right">done_all</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.enrollmentForm.values
	};
}

export default connect(mapStateToProps, actions)(
	withRouter(EnrollmentFormReview)
);
