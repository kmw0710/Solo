import React from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import ItemList from './ItemList.jsx';
import Data from './sampleData.jsx';
import Login from './Login.jsx';
import CheckOut from './CheckOut.jsx';
import CheckOutView from './CheckOutView.jsx';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      currentItem: [],
      savedItems: [],
      username: '',
      password: '',
      auth: true,
      index: '',
      show: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceRange = this.handlePriceRange.bind(this);
    this.handleSaveItem = this.handleSaveItem.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOneItem = this.handleOneItem.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    var random = Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 3)
    axios({
      method:'get', 
      url: 'search',
      params:{
        lookup: random
      }
    })
    .then(res => {
      this.setState({
        username: '',
        password: '',
        savedItems: [],
        auth: true,
        items: res.data
      })
    })
  }

  handleCheckOut() {
    let totalPrice = this.state.savedItems.reduce((acc, ele) => {
      return acc + ele.salePrice;
    }, 0);
    this.setState({
      show: false
    })
  }

  handleSubmit(event) {
    console.log(event);
    axios({
      method: 'get',
      url: '/search',
      params: {
        lookup: event
      }
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        items: res.data
      })
    })
  }

  handlePriceRange(sorted) {
    this.setState({
      items: sorted
    })
  }

  handleDelete() {
    axios({
      method: 'get',
      url: '/delete',
      params: {
        Item: this.state.index,
        username: this.state.username
      }
    })
    .then(res => {
      this.setState({
        savedItems: res.data.savedItem
      })
    });
    alert('Item deleted!')
  }

  handleSaveItem(item) {
    if(this.state.auth === true) {
      alert('You need to log in!')
    } else if (this.state.auth === false) {
      let tempSavedItems = this.state.savedItems;
      tempSavedItems.push(item);
      this.setState({
        savedItems: tempSavedItems
      });
      axios({
        method: 'post',
        url: '/save',
        data: {
          username: this.state.username,
          password: this.state.password,
          savedItems: this.state.currentItem
        }
      })
      .then(res => {
        console.log('saved or not?')
      });
      axios({
        method: 'get',
        url: '/login',
        params: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then(res => {
        console.log(res.data, 'RES DATA')
        this.setState({
          username: res.data.username,
          password: res.data.password,
          savedItems: res.data.savedItem
        })
      })
    }
    if (!this.state.auth) {
      alert('Item added!')
    }
  }

  handleNewAccount(user, pass) {
    console.log('hi')
    axios({
      method: 'post',
      url: '/create',
      data: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      console.log(res.data, 'post then res')
      if (typeof res.data === 'string') {
        alert(res.data)
      }
    })
  }

  handleGoBack() {
    this.setState({
      show: true
    })
  }

  handleLogin(username, password) {
    axios({
      method: 'get',
      url: '/login',
      params: {
        username: username,
        password: password
      }
    })
      .then(res => {
        if (typeof res.data === 'string') {
          alert(res.data)
        } else {
          this.setState({
            username: res.data.username,
            password: res.data.password,
            savedItems: res.data.savedItem,
            auth: false
          })
        }
      })
  }

  handleLogout () {
    this.setState({
      username: '',
      password: '',
      savedItems: [],
      auth: true,
      show: true
    })
  }

  handleClicked(item, i) {
    this.setState({
      currentItem: item,
      index: i
    })

  }

  handleOneItem(clicked) {
    this.setState({
      currentItem: clicked
    })
  }

  render() {
    let back = !this.state.show ? <button
      onClick={this.handleGoBack}> Back </button> : '';
    
    

    let normal = this.state.show ? <div>
          <ItemList handleOneItem={this.handleOneItem} items={this.state.items} savedItems={this.state.savedItems} 
          currentItem={this.state.currentItem} handlePriceRange={this.handlePriceRange} 
          handleSaveItem={this.handleSaveItem} auth={this.state.auth}/>
        </div> : '';

    let unnormal = !this.state.show ? <div style={{marginTop: '100px'}}> <CheckOutView /> </div> : '';


    return (
      <div>
        <div className='Navbar'>
        <Navbar handleDelete={this.handleDelete} handleCheckOut={this.handleCheckOut}
          handleLogout={this.handleLogout} auth={this.state.auth} items={this.state.items} 
          handleSubmit={this.handleSubmit} handleClicked={this.handleClicked} savedItems={this.state.savedItems}
          handleNewAccount={this.handleNewAccount} handleLogin={this.handleLogin}/>
        <a className='back'>
        {back}
        </a>
        </div>
        <div>
        {normal}{unnormal}
        </div>
      </div>

    );
  }
}
