import React from 'react';

const ItemView = (props) => {
	return (
		<div>
		<ul className='currentItem'>
			<img style={{height: '180px', width:'250px'}} src={props.currentItem.thumbnailImage ? props.currentItem.thumbnailImage : null} />
			<h3 style={{float: 'right', marginRight:'60px', marginTop: '70px'}}>{props.currentItem.salePrice ? props.currentItem.salePrice : null} </h3>
		</ul>
			<button className='add' onClick={props.handleSave}> Add to Cart </button>
		</div>
	)
}

export default ItemView;