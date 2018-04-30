import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Header, Dashboard, EnrollmentNew, RespondNew } from './';

const Landing = () => <h2>Landing</h2>;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container">
							<Route exact path="/" component={Landing} />
							<Route exact path="/dashboard" component={Dashboard} />
							<Route exact path="/response/new" component={RespondNew} />
							<Route path="/enrollments/new" component={EnrollmentNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
