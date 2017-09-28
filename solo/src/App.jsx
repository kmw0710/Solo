import React from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import ItemList from './ItemList.jsx';
import Data from './sampleData.jsx';
import Login from '../public/Login.jsx';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: Data,
      currentItem: '',
      savedItems: [{name: 'samsung', salePrice: 500}, {name:'lg', salePrice:150}],
      username: '',
      password: '',
      auth: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceRange = this.handlePriceRange.bind(this);
    this.handleSaveItem = this.handleSaveItem.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: '',
      password: '',
      savedItems: ['hi'],
      auth: true
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
          savedItems: this.state.savedItems
        }
      })
      .then(res => {
        console.log('saved or not?')
      })
    }

  }

  handleNewAccount(user, pass) {
    axios({
      method: 'post',
      url: '/create',
      data: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      console.log(res.data)
      if (typeof res.data === 'string') {
        alert(res.data)
      }
    })
  }

  handleLogin(user, pass) {
    axios({
      method: 'get',
      url: '/login',
      params: {
        username: user,
        password: pass
      }
    })
      .then(res => {
        if (typeof res.data === 'string') {
          alert(res.data)
        } else {
          console.log(res.data)
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
      auth: true
    })
  }

  render() {
    return (
      <div>
        <div className='Navbar'>
        <Navbar handleLogout={this.handleLogout} auth={this.state.auth} items={this.state.items} 
          handleSubmit={this.handleSubmit} savedItems={this.state.savedItems}
          handleNewAccount={this.handleNewAccount} handleLogin={this.handleLogin}/>
        </div>
        <div>
          <ItemList items={this.state.items} savedItems={this.state.savedItems} currentItem={this.state.currentItem} 
            handlePriceRange={this.handlePriceRange} handleSaveItem={this.handleSaveItem}/>
        </div>
      </div>  
    );
  }
}
