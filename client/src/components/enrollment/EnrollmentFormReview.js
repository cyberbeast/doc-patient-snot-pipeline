import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit
	},
	card: {
		minWidth: 275
	},
	title: {
		marginBottom: 16,
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	}
});

const EnrollmentFormReview = ({
	onCancel,
	formValues,
	submitEnrollment,
	history,
	classes
}) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<Typography variant="subheading" gutterBottom>
					{label}
				</Typography>
				<Typography variant="title" gutterBottom>
					{formValues[name]}
				</Typography>
			</div>
		);
	});

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary">
					Patient Enrollment
				</Typography>
				<Typography variant="headline" component="h2">
					Review
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					Please confirm your entries.
				</Typography>
				<br />
				<br />
				<br />

				{reviewFields}
			</CardContent>
			<CardActions style={{ display: 'flow-root' }}>
				<Button onClick={onCancel} color="secondary" size="small">
					{' '}
					<Icon className={classes.leftIcon}>navigate_before</Icon>Back
				</Button>
				<Button
					type="submit"
					color="primary"
					size="small"
					onClick={() => submitEnrollment(formValues, history)}
				>
					Enroll
					<Icon className={classes.rightIcon}>done</Icon>
				</Button>
			</CardActions>
		</Card>
	);
};

EnrollmentFormReview.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		formValues: state.form.enrollmentForm.values
	};
}

export default connect(mapStateToProps, actions)(
	withRouter(withStyles(styles)(EnrollmentFormReview))
);
