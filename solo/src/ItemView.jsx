import React from 'react';
import CartPlus from 'react-icons/lib/fa/cart-plus'

const ItemView = (props) => {
	console.log(props, 'props in ItemView')
	return (
		<div>
		<ul className='currentItem'>
			<img style={{borderRadius:'25px', backgroundSize: 'cover',height: '180px', marginLeft: '0px', width:'250px', float:'right'}} src={props.currentItem.thumbnailImage ? props.currentItem.thumbnailImage : 'https://i.imgur.com/POCLBBr.jpg'} />
			<p style={{float: 'left', width:'150px'}}>{props.currentItem.name ? props.currentItem.name : null}<br/>{props.currentItem.salePrice ? `$` + props.currentItem.salePrice : `Soloweek Project:`} </p>
		</ul>
			<button className='add' onClick={props.handleSave}> <CartPlus/> </button>
		</div>
	)
}

export default ItemView;