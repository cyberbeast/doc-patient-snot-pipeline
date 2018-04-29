import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEnrollments } from '../../actions';

class EnrollmentList extends Component {
	componentDidMount() {
		this.props.fetchEnrollments();
	}

	renderErrorPanel(error) {
		return (
			<div className="card-panel teal center-align">
				<span className="white-text">{error}</span>
			</div>
		);
	}

	renderCardTitle(enrollment) {
		switch (this.props.mode) {
			case 'Doctor':
				return (
					<span className="card-title"> {enrollment.recipient.email}</span>
				);
				break;

			case 'Patient':
				return <span className="card-title"> {enrollment.title}</span>;
				break;

			default:
				this.renderErrorPanel('Invalid Mode!');
				break;
		}
	}

	renderCardBody(enrollment) {
		switch (this.props.mode) {
			case 'Doctor':
				return (
					<p>
						Enrolled to {enrollment.title} :{' '}
						{new Date(enrollment.dateCreated).toLocaleDateString()}
					</p>
				);
				break;

			case 'Patient':
				return (
					<p>
						Enrolled : {new Date(enrollment.dateCreated).toLocaleDateString()}
					</p>
				);
				break;

			default:
				this.renderErrorPanel('Invalid Mode!');
				break;
		}
	}

	renderCardActions() {
		switch (this.props.mode) {
			case 'Doctor':
				return <Link to="/"> View </Link>;
				break;

			case 'Patient':
				return <Link to="/"> Respond </Link>;
				break;

			default:
				this.renderErrorPanel();
				break;
		}
	}

	renderEnrollments() {
		if (this.props.enrollments.length === 0) {
			this.renderErrorPanel(
				'You do not have any active enrollments currently!'
			);
		} else {
			return this.props.enrollments.reverse().map(enrollment => {
				return (
					<div className="card darken-1" key={enrollment._id}>
						<div className="card-content">
							{this.renderCardTitle(enrollment)}
							{this.renderCardBody(enrollment)}
						</div>
						<div className="card-action">{this.renderCardActions()}</div>
					</div>
				);
			});
		}
	}

	render() {
		return <div>{this.renderEnrollments()}</div>;
	}
}

function mapStateToProps({ enrollments }) {
	return { enrollments };
}

export default connect(mapStateToProps, { fetchEnrollments })(EnrollmentList);
