// ResponseNew shows ResponseForm and ResponseFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ResponseForm from './ResponseForm';
import ResponseFormReview from './ResponseFormReview';

class ResponseNew extends Component {
	state = { showResponseFormReview: false };

	renderContent() {
		if (this.state.showResponseFormReview) {
			return (
				<ResponseFormReview
					onCancel={() => this.setState({ showResponseFormReview: false })}
				/>
			);
		}

		return (
			<ResponseForm
				onResponseSubmit={() => this.setState({ showResponseFormReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'responseForm'
})(ResponseNew);
