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
					onCancel={() => this.setState({ showEnrollmentFormReview: false })}
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
		return (
			<div style={{ margin: '2%', textAlign: 'center' }}>
				{this.renderContent()}
			</div>
		);
	}
}

export default reduxForm({
	form: 'enrollmentForm'
})(EnrollmentNew);
