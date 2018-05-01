import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EnrollmentList from './enrollment/EnrollmentList';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 'auto',
		position: 'relative',
		minHeight: '90vh'
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 3,
		right: theme.spacing.unit * 1
	}
});

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
					<div className={this.props.classes.root}>
						<EnrollmentList mode="Doctor" />
						<Button
							variant="fab"
							color="primary"
							className={this.props.classes.fab}
							component={Link}
							to="/enrollments/new"
						>
							<AddIcon />
						</Button>
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
		return <div>{this.renderContentOnAppMode()}</div>;
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

function mapStateToProps({ mode }) {
	return { mode };
}
export default connect(mapStateToProps)(
	withStyles(styles, { withTheme: true })(Dashboard)
);
