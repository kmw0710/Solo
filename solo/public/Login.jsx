import React from 'react';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}
	handleUsername(event) {
		let tempUsername = event.target.value;
		this.setState({
			username: tempUsername
		})
	}

	handlePassword(event) {
		let tempPassword = event.target.value;
		this.setState({
			password: tempPassword
		})
	}


	render() {
		return(
			<div>
				<div>
					<input type='text' value={this.state.username} placeholder={`Enter username`} />
				</div>
				<div>
					<input type='text' value={this.state.password} placeholder={`Enter password`} />
				</div>
			</div>

		)
	}
}