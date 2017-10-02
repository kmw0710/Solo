import React from 'react';
import Form from 'react-icons/lib/fa/cc-paypal';
import Cards from 'react-credit-cards';
import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import Payment from 'payment';

export default class CheckOutView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.renderCardList = this.renderCardList.bind(this);
		this.renderCardForm = this.renderCardForm.bind(this);
		this.setCardType = this.setCardType.bind(this);
	}

	componentDidMount() {

		let style = {
	  	base: {
		    color: '#32325d',
		    lineHeight: '24px',
		    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
		    fontSmoothing: 'antialiased',
		    fontSize: '16px',
		    '::placeholder': {
		      color: '#aab7c4'
		    }
	  	},
	  	invalid: {
	    	color: '#fa755a',
	    	iconColor: '#fa755a'
	 	  }
		};
		let stripe = Stripe('pk_test_MjsX96L1CG7M9azKahbxvmHQ');
		let elements = stripe.elements();
		let card = elements.create('card', {style: style});
		card.mount('#card-element');
	}


	renderCardList() {
    return (<ul style={{marginLeft: '5px'}}>
      <a><i style={{width:'10px', marginLeft: '15px'}} data-brand="visa" className="fa fa-cc-visa"></i></a>
      <a><i style={{width:'10px', marginLeft: '15px'}} data-brand="amex" className="fa fa-cc-amex"></i></a>
      <a><i style={{width:'10px', marginLeft: '15px'}} data-brand="mastercard" className="fa fa-cc-mastercard"></i></a>
      <a><i style={{width:'10px', marginLeft: '15px'}} data-brand="jcb" className="fa fa-cc-jcb"></i></a>
      <a><i style={{width:'10px', marginLeft: '15px'}} data-brand="discover" className="fa fa-cc-discover"></i></a>
      <a><i style={{width:'10px', marginLeft: '15px'}} data-brand="dinersclub" className="fa fa-cc-diners-club"></i></a>
    </ul>);
  }

  renderCardForm() {
    return (<form className="CardForm" onSubmit={ this.handleSubmit }>
      <Row>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Card Number</ControlLabel>
            <input
              onKeyUp={ this.setCardType }
              className="form-control"
              type="text"
              ref="number"
              placeholder="Card Number"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={ 6 } sm={ 5 }>
          <FormGroup>
            <ControlLabel>Expiration</ControlLabel>
            <input
              className="form-control text-center"
              type="text"
              ref="expiration"
              placeholder="MM/YYYY"
            />
          </FormGroup>
        </Col>
        <Col xs={ 6 } sm={ 4 } smOffset={ 3 }>
          <FormGroup>
            <ControlLabel>CVC</ControlLabel>
            <input
              className="form-control text-center"
              type="text"
              ref="cvc"
              placeholder="CVC"
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" bsStyle="success" block>Submit</Button>
    </form>);
  }

  renderCard() {
    const { number, exp_month, exp_year, cvc, token } = this.state;
    return number ? (<Alert bsStyle="info">
      <h5>{ number }</h5>
      <p className="exp-cvc">
        <span>{ exp_month }/{ exp_year }</span>
        <span>{ cvc }</span>
      </p>
      <em>{ token }</em>
    </Alert>) : '';
  }

  setCardType(event) {
    const type = Payment.fns.cardType(event.target.value);
    const cards = document.querySelectorAll('[data-brand]');

    [].forEach.call(cards, (element) => {
      if (element.getAttribute('data-brand') === type) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }


	render() {
			return (
			<div style={{marginTop: '150px'}}>
			 	<form action="/charge" method="post" id="payment-form">
			 	  <div className="form-row" style={{marginLeft: '500px', marginTop:'150px'}}>
			 	    <label className='card-label' style={{marginTop:'150px'}}>
			 	  	 {this.renderCardList()}
			 	  			
			 	  <div id='card-element' style={{marginRight: '500px', marginTop: '150px'}} />
			 	 			  	      Credit or debit card
			 	  	</label>
			 	  	<div id="card-errors" role="alert"></div>
			 		</div>
			 		  <button style={{marginRight: '500px'}}>Submit Payment</button>
			 	</form>
			 </div>
    );
	}
} 