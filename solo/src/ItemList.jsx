import React from 'react';
import ItemEntry from './ItemEntry.jsx';
import ItemView from './ItemView.jsx';
import { Col, Button } from 'react-bootstrap';
import Dropdown from 'react-dropdown';

export default class ItemList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemList: this.props.items,
			currentItem: '',
			min: '',
			max: '',
			priceOption: ['L to H', 'H to L']
		}
		this.showOneItem = this.showOneItem.bind(this);
		this.handleMinPrice = this.handleMinPrice.bind(this);
		this.handleMaxPrice = this.handleMaxPrice.bind(this);
		this.handlePrice = this.handlePrice.bind(this);
		this.handlePriceSort = this.handlePriceSort.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps, 'nextProps')
		this.setState({
			itemList: nextProps.items
		});
	}

	showOneItem(clicked) {
    this.setState({
      currentItem: clicked
    })
  }

  handlePrice() {
  	let priceSorted = this.state.itemList.filter(ele => {
  		return ele.salePrice > this.state.min && ele.salePrice < this.state.max
  	})
  	this.props.handlePriceRange(priceSorted)
  }	

  handleMinPrice(event) {
  	let tempMin = event.target.value;
  	this.setState({
  		min: tempMin
  	})
  }

  handleMaxPrice(event) {
  	let tempMax = event.target.value;
  	this.setState({
  		max: tempMax
  	})
  }

  handlePriceSort(event) {
  	let tempSort;
  	if (event.value === 'L to H') {
  		tempSort = this.state.itemList.sort((a, b) => {
  			return a.salePrice - b.salePrice;
  		})
  	} else if (event.value === 'H to L'){
  		tempSort = this.state.itemList.sort((a, b) => {
  			return b.salePrice - a.salePrice;
  		})
  	};
  	this.props.handlePriceRange(tempSort);
  }

  handleSave () {
  	this.props.handleSaveItem(this.state.currentItem)
  }




	render() {
		let itemList = this.state.itemList.map((ele, i) => {
			return <ItemEntry ele={ele} i={i} key={i} showOneItem={this.showOneItem} 
			handleSave={this.handleSave}/>
		});

		return(
			<div>
				<Col sm={4} md={3}>
				<ul className='PriceRange'>
					<input type='text' value={this.state.min} onChange={this.handleMinPrice} size='2' placeholder='Min'/>
					<input type='text' value={this.state.max} onChange={this.handleMaxPrice} size='2' placeholder='Max'/>					
					<Button onClick={this.handlePrice}> Search </Button>
					<Dropdown options={this.state.priceOption} value={`Price Sort`} onChange={this.handlePriceSort}/>
				</ul>
				<div>
					<ItemView currentItem={this.state.currentItem} handleSave={this.handleSave}/>
				</div>
					<ul className='itemEntry'>
						{itemList}
					</ul>
				</Col>
			</div>
		)
	}
}