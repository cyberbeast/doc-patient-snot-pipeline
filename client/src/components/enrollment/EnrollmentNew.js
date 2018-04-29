// EnrollmentNew has 2 Child-components :- EnrollmentForm and EnrollmentFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import EnrollmentForm from './EnrollmentForm';
import EnrollmentFormReview from './EnrollmentFormReview';

class EnrollmentNew extends Component {
	state = { showEnrollmentFormReview: false };

	renderContent() {
		if (this.state.showEnrollmentFormReview) {
			return (
				<EnrollmentFormReview
					onCancel={() => this.state({ showEnrollmentFormReview: false })}
				/>
			);
		}

		return (
			<EnrollmentForm
				onEnrollmentFormSubmit={() =>
					this.setState({
						showEnrollmentFormReview: true
					})
				}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'enrollmentForm'
})(EnrollmentNew);
