import React from 'react';
import {Button} from 'react-bootstrap';
import SavedItems from './SavedItems.jsx';
import axios from 'axios';
import Login from './Login.jsx';


export default class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			savedItems: this.props.savedItems,
			showItems: false,
			showAcc: this.props.auth,
			showOut: !this.props.auth
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showSavedItems = this.showSavedItems.bind(this);
		this.itemClicked = this.itemClicked.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps, 'nextProps')
		this.setState({
			showAcc: nextProps.auth,
			showOut: !nextProps.auth,
			savedItems: this.props.savedItems
		});
	}

	handleChange(event) {
		let tempName = event.target.value;
		console.log(tempName);
		this.setState({
			search: tempName
		})
	}

	handleSubmit() {
		this.props.handleSubmit(this.state.search)
	}

	showSavedItems() {
		if (this.state.showItems === true) {
			this.setState({
				showItems: false
			})
		} else if (this.state.showItems === false) {
			this.setState({
				showItems: true
			})
		}	
	}

	logout() {
		this.props.handleLogout();
		this.setState({
			savedItems: []
		})
	}

	itemClicked(hi) {
		console.log('coming soon')
	}

	render() {
		let showItems = this.state.savedItems.map((item, i) => {
			if (this.state.showItems === true) {
				return <SavedItems item={item} i={i} key={i} itemClicked={this.itemClicked} />
			}
		})
		let showLogin = this.state.showAcc ? <Login showAcc={this.state.showAcc} handleLogin={this.props.handleLogin} 
			handleNewAccount={this.props.handleNewAccount}/> : '';
		let showLogout = this.state.showOut ? <Button onClick={this.logout}>
						 Log out </Button> : '';
		let showCart = this.state.showOut ? <Button style={{marginRight: '15px', width: '165px'}} onClick={this.showSavedItems}>
						 My Cart </Button> : '';
		return (
			<div>
				<div>
					<ul className='menu'>
					{showLogout}
					{showLogin}
					{showCart}
					{showItems}
					</ul>	
				</div>
				<div>
					<input className='search' type="text" 
					value={this.state.value} onChange={this.handleChange} placeholder="Search" />
					<button onClick={this.handleSubmit}>search</button>
				</div>
			</div>
		)
	}
}