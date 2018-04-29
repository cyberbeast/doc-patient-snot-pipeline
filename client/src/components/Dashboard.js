import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EnrollmentList from './enrollment/EnrollmentList';

class Dashboard extends Component {
	renderContentOnAppMode() {
		switch (this.props.mode) {
			case null:
				return;
			case false:
				return (
					<div>
						<h3>Set App Mode!</h3>
					</div>
				);
			case 'Doctor':
				return (
					<div>
						<div className="fixed-action-btn">
							<Link
								to="/enrollments/new"
								className="btn-floating btn-large red"
							>
								<i className="large material-icons">add</i>
							</Link>
						</div>
						<EnrollmentList mode="Doctor" />
					</div>
				);
			case 'Patient':
				return (
					<div>
						<h3>Patient Mode!</h3>
						<EnrollmentList mode="Patient" />
					</div>
				);
			default:
				return (
					<div>
						<h3>Invalid App Mode!</h3>
					</div>
				);
		}
	}

	render() {
		return (
			<div>
				{this.renderContentOnAppMode()}
				{/* <SurveyList /> */}
			</div>
		);
	}
}

function mapStateToProps({ mode }) {
	return { mode };
}
export default connect(mapStateToProps)(Dashboard);
