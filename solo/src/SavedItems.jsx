import React from 'react';

const SavedItems = (props) => {
	return (
		<div className='SavedItems' onClick={event => {
			props.itemClicked(props.item, props.i)}}>
			<img src={props.item.thumbnailImage} />
			<p style={{float: 'left'}}><br/>{props.item.name.slice(0, 20)} <br/> ${props.item.salePrice} </p>
		</div>
	)
}

export default SavedItems;