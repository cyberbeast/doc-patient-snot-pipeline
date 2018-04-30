import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderLogin() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="Chip">
						<div className="chip">
							<img src={this.props.auth.profileImage} alt="user" />
							{this.props.auth.firstName} {this.props.auth.lastName},{' '}
							<em>{this.props.auth.userType}</em>
						</div>
					</li>,
					<li key="Logout">
						<a href="/auth/logout">Logout</a>
					</li>
				];
		}
	}

	render() {
		console.log(this.props);
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
						style={{ paddingLeft: '2%' }}
					>
						HealthApp
					</Link>
					<ul className="right">{this.renderLogin()}</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(Header);
