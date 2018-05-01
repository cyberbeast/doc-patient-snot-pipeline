import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import responseFormFields from './responseFormFields';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Radio from 'material-ui/Radio';
import green from 'material-ui/colors/green';
import { Checkbox, RadioGroup } from 'redux-form-material-ui';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
		color: green[600],
		'&$checked': {
			color: green[500]
		}
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
	table: {
		minWidth: 700
	},
	tableCell: {
		textAlign: 'center'
	},
	checked: {},
	size: {
		width: 40,
		height: 40
	},
	sizeIcon: {
		fontSize: 20
	},
	button: {
		margin: theme.spacing.unit
	}
});

class ResponseForm extends Component {
	handleChange = event => {
		this.setState({ selectedValue: event.target.value });
	};

	renderFields() {
		return _.map(responseFormFields, ({ label, minValue, maxValue }) => {
			return (
				<TableRow key={label}>
					<TableCell>{label}</TableCell>
					<TableCell>
						<Field name={label} component={RadioGroup}>
							<Radio name={label} value="0" label="0" />
						</Field>
					</TableCell>
					<TableCell>
						<Field name={label} component={RadioGroup}>
							<Radio value="1" label="1" />
						</Field>
					</TableCell>
					<TableCell>
						<Field name={label} component={RadioGroup}>
							<Radio value="2" label="2" />
						</Field>
					</TableCell>
					<TableCell>
						<Field name={label} component={RadioGroup}>
							<Radio value="3" label="3" />
						</Field>
					</TableCell>
					<TableCell>
						<Field name={label} component={RadioGroup}>
							<Radio value="4" label="4" />
						</Field>
					</TableCell>
					<TableCell>
						<Field name={label} component={RadioGroup}>
							<Radio value="5" label="5" />
						</Field>
					</TableCell>
					<TableCell>
						<span>|</span>{' '}
					</TableCell>
					<TableCell>
						<Field name={'IMP,' + label} component={Checkbox} />
					</TableCell>
				</TableRow>
			);
		});
	}

	renderHeadings(headingArray) {
		return headingArray.map((item, i) => {
			return (
				<TableCell
					key={`${i}-${item}`}
					className={this.props.classes.tableCell}
				>
					{item}
				</TableCell>
			);
		});
	}

	renderDate() {
		return new Date().toLocaleDateString();
	}

	render() {
		return (
			<div style={{ marginTop: '2%' }}>
				<Card className={this.props.classes.card}>
					<CardContent>
						<Typography
							className={this.props.classes.title}
							color="textSecondary"
						>
							{this.renderDate()}
						</Typography>
						<Typography variant="headline" component="h2">
							SINO-NASAL OUTCOME TEST (SNOT-22)
						</Typography>
						<Typography color="textSecondary" variant="caption">
							SNOT-20 Copyright &copy; 1996 by Jay F. Piccirillo, M.D.,
							Washington University School of Medicine, St. Louis, Missouri.
						</Typography>
						<Typography
							className={this.props.classes.pos}
							color="textSecondary"
							variant="caption"
						>
							SNOT-22 Developed from modification of SNOT-20 by National
							Comparative Audit of Surgery for Nasal Polyposis and
							Rhinosinusitis Royal College of Surgeons of England.
						</Typography>
						<Typography component="p">
							Below you will find a list of symptoms and social/emotional
							consequences of your rhinosinusitis. We would like to know more
							about these problems and would appreciate your answering the
							following questions to the best of your ability. There are no
							right or wrong answers, and only you can provide us with this
							information. Please rate your problems as they have been over the
							past two weeks. Thank you for your participation. Do not hesitate
							to ask for assistance if necessary.
						</Typography>
					</CardContent>
				</Card>
				<form onSubmit={this.props.handleSubmit(this.props.onResponseSubmit)}>
					<Paper className={this.props.classes.root}>
						<Table className={this.props.classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Problem</TableCell>
									{this.renderHeadings([
										'No Problem',
										'Very Mild Problem',
										'Very Mild Problem',
										'Moderate Problem',
										'Severe Problem',
										'Problem as bad as it can be',
										'|',
										'5 Most Important Items'
									])}
								</TableRow>
							</TableHead>
							<TableBody>{this.renderFields()}</TableBody>
						</Table>
					</Paper>
					<div style={{ textAlign: 'center' }}>
						<Button
							type="submit"
							variant="raised"
							color="secondary"
							component={Link}
							to="/dashboard"
							className={this.props.classes.button}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="raised"
							color="primary"
							className={this.props.classes.button}
						>
							Submit Response
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

ResponseForm.propTypes = {
	classes: PropTypes.object.isRequired
};

function validate(values) {
	const errors = {};

	_.each(responseFormFields, ({ label }) => {
		if (!values[label]) {
			errors[label] = `Missing response for - ${label}`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'responseForm'
})(withStyles(styles)(ResponseForm));
