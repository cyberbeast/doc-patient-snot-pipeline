import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	chip: {
		margin: theme.spacing.unit
	},
	button: {
		margin: theme.spacing.unit,
		color: '#e3f2fd'
	}
});

class Header extends Component {
	generateDisplayName() {
		return (
			<span>
				<b>
					{this.props.auth.firstName} {this.props.auth.lastName}
				</b>
			</span>
		);
	}
	renderLogin() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<Button color="inherit" href="/auth/google">
						Login with Google
					</Button>
				);
			default:
				return [
					<Chip
						key="userType"
						label={this.props.auth.userType}
						className={this.props.classes.chip}
					/>,
					<Chip
						key="displayName"
						avatar={<Avatar src={this.props.auth.profileImage} />}
						label={this.generateDisplayName()}
						className={this.props.classes.chip}
					/>,
					<Button
						key="logOut"
						href="/auth/logout"
						className={this.props.classes.button}
					>
						Log Out
					</Button>
				];
		}
	}

	render() {
		console.log(this.props);
		return (
			<div className={this.props.classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							className={this.props.classes.menuButton}
							color="inherit"
							aria-label="Menu"
							component={Link}
							to={this.props.auth ? '/dashboard' : '/'}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="title"
							color="inherit"
							className={this.props.classes.flex}
						>
							HealthApp
						</Typography>
						{this.renderLogin()}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(withStyles(styles)(Header));
