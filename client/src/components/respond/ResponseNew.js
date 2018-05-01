// ResponseNew shows ResponseForm and ResponseFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ResponseForm from './ResponseForm';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ResponseNew extends Component {
	renderContent() {
		return (
			<ResponseForm
				onResponseSubmit={values => {
					this.props.submitResponse(
						values,
						this.props.history,
						this.props.match.params.enrollmentId
					);
				}}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default connect(null, actions)(
	reduxForm({
		form: 'responseForm'
	})(ResponseNew)
);
