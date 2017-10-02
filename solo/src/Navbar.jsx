import React from 'react';
import {Button} from 'react-bootstrap';
import SavedItems from './SavedItems.jsx';
import axios from 'axios';
import Login from './Login.jsx';
import Search from 'react-icons/lib/fa/search';
import Trash from 'react-icons/lib/fa/trash';
import Cart from 'react-icons/lib/fa/cart-arrow-down';
import CheckOut from './CheckOut.jsx';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			savedItems: [],
			showItems: false,
			showAcc: this.props.auth,
			showOut: !this.props.auth
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showSavedItems = this.showSavedItems.bind(this);
		this.itemClicked = this.itemClicked.bind(this);
		this.logout = this.logout.bind(this);
		this.deleteOne = this.deleteOne.bind(this);
		this.itemClicked = this.itemClicked.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			showAcc: nextProps.auth,
			showOut: !nextProps.auth,
			savedItems: nextProps.savedItems
		});
	}

	handleChange(event) {
		let tempName = event.target.value;
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

	itemClicked(item, i) {
		this.props.handleClicked(item, i)
	}

	deleteOne() {
		this.props.handleDelete()
	}

	render() {
		let totalPrice = this.state.savedItems.reduce((acc, ele) => {
			return acc + ele.salePrice;
		}, 0);
		totalPrice = parseFloat(Math.round(totalPrice*100)/100).toFixed(2);

		let showTotal = this.state.showItems ? 'Total price: ' + totalPrice : '';

		let deleteItem = this.state.showOut ? <Button className='down' style={{width: '90px'}}
			onClick={this.deleteOne}> <Trash /> </Button> : '';
		
		let showItems = this.state.savedItems.map((item, i) => {
			if (this.state.showItems === true) {
				return <SavedItems className='down' item={item} i={i} key={i} itemClicked={this.itemClicked} />
			}
		})
		let showLogin = this.state.showAcc ? <Login showAcc={this.state.showAcc} handleLogin={this.props.handleLogin} 
			handleNewAccount={this.props.handleNewAccount}/> : '';
		let showLogout = this.state.showOut ? <Button className='down' style={{width:'75px'}} onClick={this.logout}>
						 Log out </Button> : '';
		let showCart = this.state.showOut ? <Button className='down' style={{width: '90px'}} onClick={this.showSavedItems}>
						 <Cart /></Button> : '';

		let checkout = this.state.showOut ? <CheckOut totalPrice={totalPrice} className='down' handleCheckOut={this.props.handleCheckOut} /> : '';

		return (
			<div className='Navbar'>
				<div>
					<ul className='menu'>
					{showLogout}
					{deleteItem}
					{showLogin}
					{showCart}
					{showItems}
					{showTotal}
					{checkout}
					</ul>	
				</div>
				<div className='check'>
					<input className='search' type="text" 
					value={this.state.value} onChange={this.handleChange} placeholder="  What are you looking for?" />
					<button className='searchButton' onClick={this.handleSubmit}><Search /></button>
				</div>
			</div>
		)
	}
}