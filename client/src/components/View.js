import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
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
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
});

class View extends Component {
	renderExpansionPanel(responses) {
		return responses.map((item, i) => (
			<ExpansionPanel key={item._id + i}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={this.props.classes.heading}>
						{item.responseDate}
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<pre>{JSON.stringify(item.responseValues, null, 2)}</pre>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		));
	}

	renderCards() {
		return this.props.responses.map(item => {
			return (
				<Card key={item.recipient.email} className={this.props.classes.card}>
					<CardContent>
						<Typography variant="headline" component="h2">
							{item.recipient.email}
						</Typography>
						<div style={{ marginTop: '1%' }}>
							{this.renderExpansionPanel(item.recipient.responses)}
						</div>
					</CardContent>
				</Card>
			);
		});
	}

	componentDidMount() {
		this.props.fetchResponses();
	}

	render() {
		console.log(this.props.responses);
		return <div style={{ marginTop: '2%' }}>{this.renderCards()}</div>;
	}
}

View.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps({ responses }) {
	return { responses };
}

export default connect(mapStateToProps, actions)(withStyles(styles)(View));
