import React from 'react';

const CheckOut = (props) => {
	return (
		<div>
			<button onClick={props.handleCheckOut} style={{width:'255px', marginTop: '0px', fontSize: '18px', fontWeight: '700'}} className='down'> Checkout ${props.totalPrice} </button>
		</div>
	)
}

export default CheckOut;