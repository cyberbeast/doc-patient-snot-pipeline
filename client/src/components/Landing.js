import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	root: {
		width: '90%',
		marginTop: '2%'
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit * 2
	},
	resetContainer: {
		padding: theme.spacing.unit * 3
	}
});

function getSteps() {
	return [
		'Login to HealthApp',
		'Interact with an Enrollment',
		'Access the data'
	];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return `Click on the "Login with Google" button on the top right corner of the app. 
      If you are a doctor, the app switches to the "Doctor Mode" else the app remains in 
      "Patient Mode". `;
		case 1:
			return `As a doctor, create an Enrollment by specifying a patient email address. 
      As a patient, respond to an existing Enrollment.`;
		case 2:
			return `Access information and play with it! :)`;
		default:
			return 'Unknown step';
	}
}

class Landing extends React.Component {
	state = {
		activeStep: 0
	};

	handleNext = () => {
		this.setState({
			activeStep: this.state.activeStep + 1
		});
	};

	handleBack = () => {
		this.setState({
			activeStep: this.state.activeStep - 1
		});
	};

	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;

		return (
			<div className={classes.root}>
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map((label, index) => {
						return (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									<Typography>{getStepContent(index)}</Typography>
									<div className={classes.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={this.handleBack}
												className={classes.button}
											>
												Back
											</Button>
											<Button
												variant="raised"
												color="primary"
												onClick={this.handleNext}
												className={classes.button}
											>
												{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length && (
					<Paper square elevation={0} className={classes.resetContainer}>
						<Typography>That is all!</Typography>
						<Button onClick={this.handleReset} className={classes.button}>
							Reset
						</Button>
					</Paper>
				)}
			</div>
		);
	}
}

Landing.propTypes = {
	classes: PropTypes.object
};

export default withStyles(styles)(Landing);
