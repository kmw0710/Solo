import React from 'react';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			auth: false
		}
		this.handleNewAccount = this.handleNewAccount.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
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

	handleNewAccount() {
		let username = this.state.username;
		let password = this.state.password;
		this.props.handleNewAccount(username, password)
	}

	handleLogin() {
		let username = this.state.username;
		let password = this.state.password;
		this.props.handleLogin(username, password);
	}

	render() {
		return(
			<div className='login'>
				<div>
					<input type='text' value={this.state.username} placeholder={`Enter username`}
					 onChange={this.handleUsername}/>
				</div>
				<div>
					<input type='password' value={this.state.password} placeholder={`Enter password`}
					 onChange={this.handlePassword}/>
				</div>
				<button onClick={this.handleNewAccount}> New Account </button>
				<button style={{width: '70px'}} onClick={this.handleLogin}> Login </button>
			</div>

		)
	}
}