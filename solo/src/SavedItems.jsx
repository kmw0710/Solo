import React from 'react';

const SavedItems = (props) => {
	return (
		<div onClick={event => {
			props.itemClicked(props.item)}}>
			<h4> {props.item.name} </h4>
		</div>
	)
}

export default SavedItems;