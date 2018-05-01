import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { fetchEnrollments } from '../../actions';

const styles = {
	card: {
		minWidth: 275
	},
	title: {
		marginBottom: 16,
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
};

class EnrollmentList extends Component {
	componentDidMount() {
		this.props.fetchEnrollments();
	}

	renderErrorPanel(errorTitle, errorDescription) {
		return (
			<div>
				<Card className={this.props.classes.card}>
					<CardContent>
						<Typography variant="headline" component="h2">
							{errorTitle}
						</Typography>
						<Typography
							className={this.props.classes.pos}
							color="textSecondary"
						>
							{errorDescription}
						</Typography>
					</CardContent>
				</Card>
			</div>
		);
	}

	renderCardTitle(enrollment) {
		switch (this.props.mode) {
			case 'Doctor':
				return enrollment.title;

			case 'Patient':
				return (
					'Dr. ' +
					enrollment._doctor.firstName +
					' ' +
					enrollment._doctor.lastName
				);

			default:
				this.renderErrorPanel('Invalid Mode!');
				break;
		}
	}

	renderCardBody(enrollment) {
		switch (this.props.mode) {
			case 'Doctor':
				return enrollment.recipient.email;

			case 'Patient':
				return enrollment.title;

			default:
				this.renderErrorPanel('Invalid Mode!');
				break;
		}
	}

	renderCardActions(enrollment) {
		switch (this.props.mode) {
			case 'Doctor':
				return (
					<Button component={Link} to={'/view/' + enrollment._id} size="small">
						View
					</Button>
				);

			case 'Patient':
				return (
					<Button
						component={Link}
						to={'/response/new/' + enrollment._id}
						size="small"
					>
						Respond
					</Button>
				);

			default:
				this.renderErrorPanel();
				break;
		}
	}

	renderEnrollments() {
		if (this.props.enrollments.length === 0) {
			return (
				<div>
					{this.renderErrorPanel(
						'All Clear!',
						'You do not have any active enrollments currently!'
					)}
				</div>
			);
		} else {
			return this.props.enrollments.reverse().map(enrollment => {
				return (
					<Card
						key={enrollment._id}
						className={this.props.classes.card}
						style={{ marginTop: '2%' }}
					>
						<CardContent>
							<Typography
								className={this.props.classes.title}
								color="textSecondary"
							>
								{this.renderCardTitle(enrollment)}
							</Typography>
							<Typography variant="headline" component="h2">
								{this.renderCardBody(enrollment)}
							</Typography>
							<Typography
								className={this.props.classes.pos}
								color="textSecondary"
							>
								{enrollment.dateCreated}
							</Typography>
						</CardContent>

						<CardActions>{this.renderCardActions(enrollment)}</CardActions>
					</Card>
				);
			});
		}
	}

	render() {
		return <div style={{ marginTop: '2%' }}>{this.renderEnrollments()}</div>;
	}
}

EnrollmentList.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps({ enrollments }) {
	return { enrollments };
}

export default connect(mapStateToProps, { fetchEnrollments })(
	withStyles(styles)(EnrollmentList)
);
