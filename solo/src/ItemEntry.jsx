import React from 'react';
import style from '../public/style.css'

const ItemEntry = (props) => {
	return (
		<div className='entry' onClick={(event) => {props.showOneItem(props.ele)}}>
			<div className='inner'>
				<img className='itemImg' src={`${props.ele.thumbnailImage}`}/>
				<ul className='itemName'>{props.ele.name}</ul>
				<ul className='itemPrice'>${props.ele.salePrice}</ul>
			</div>
		</div>
	)
}

export default ItemEntry;