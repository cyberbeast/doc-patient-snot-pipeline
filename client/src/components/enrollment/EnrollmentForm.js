// EnrollmentForm shows a form for a doctor to input a patient into the system
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import EnrollmentField from './EnrollmentField';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';
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

class EnrollmentForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					component={EnrollmentField}
					type="text"
					label={label}
					name={name}
					key={name}
				/>
			);
		});
	}

	render() {
		return (
			<form
				style={{ textAlign: 'center' }}
				onSubmit={this.props.handleSubmit(this.props.onEnrollmentFormSubmit)}
			>
				<Card className={this.props.classes.card}>
					<CardContent>
						<Typography
							className={this.props.classes.title}
							color="textSecondary"
						>
							Patient Enrollment
						</Typography>
						<Typography variant="headline" component="h2">
							SNOT22
						</Typography>
						<Typography
							className={this.props.classes.pos}
							color="textSecondary"
						>
							Version 1.0
						</Typography>

						{this.renderFields()}
					</CardContent>
					<CardActions style={{ display: 'flow-root' }}>
						<Button
							component={Link}
							to="/dashboard"
							color="secondary"
							size="small"
						>
							{' '}
							<Icon className={this.props.classes.leftIcon}>
								navigate_before
							</Icon>Cancel
						</Button>
						<Button type="submit" color="primary" size="small">
							Next
							<Icon className={this.props.classes.rightIcon}>
								navigate_next
							</Icon>
						</Button>
					</CardActions>
				</Card>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipient = validateEmail(values.recipient || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide - ${name}`;
		}
	});

	return errors;
}

EnrollmentForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default reduxForm({
	validate,
	form: 'enrollmentForm',
	destroyOnUnmount: false
})(withStyles(styles)(EnrollmentForm));
