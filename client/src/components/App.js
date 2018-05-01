import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {
	Header,
	Dashboard,
	EnrollmentNew,
	ResponseNew,
	View,
	Landing
} from './';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div style={{ height: '100vh', width: '100vw', maxHeight: '100vh' }}>
				<BrowserRouter>
					<div>
						<Header />
						<div style={{ marginLeft: '2%', marginRight: '2%' }}>
							<Route exact path="/" component={Landing} />
							<Route exact path="/dashboard" component={Dashboard} />
							<Route
								exact
								path="/response/new/:enrollmentId"
								component={ResponseNew}
							/>
							<Route exact path="/view/:enrollmentId" component={View} />
							<Route path="/enrollments/new" component={EnrollmentNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
