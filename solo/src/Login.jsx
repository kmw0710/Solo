import React from 'react';
import {Button} from 'react-bootstrap';

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
			<div>
				<form className='form-signin'>
					<input className='form-control' style={{marginTop: '50px', marginLeft: '10px'}} id='inputUsername' type='text' value={this.state.username} placeholder={`Enter username`}
					 onChange={this.handleUsername}/>
					<input className='form-control' style={{marginLeft:'10px'}} id='inputPassword' type='password' value={this.state.password} placeholder={`Enter password`}
					 onChange={this.handlePassword}/>
				</form>
				<Button className='signin-button' style={{marginLeft: '5px'}} onClick={this.handleLogin}> Login </Button>
				<Button className='signin-button' onClick={this.handleNewAccount}> New Account </Button>
			</div>

		)
	}
}