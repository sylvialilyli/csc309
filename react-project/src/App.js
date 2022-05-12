import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom';

import Login from './components/Login/Login'
import Main from './components/Main/Main'
import ManagePets from './components/ManagePets/ManagePets'
import Upgrade from './components/Upgrade/Upgrade'
import Admin from './components/Admin/Admin'
import FindMatch from './components/FindMatch/FindMatch'
import Register from './components/Register/Register'

import { bake_cookie } from 'sfcookies'

class App extends React.Component {

  constructor(props) {

    super(props)

    this.changeLogin = this.changeLogin.bind(this)
    this.changeUserInfo = this.changeUserInfo.bind(this)
    this.changeCreditCard = this.changeCreditCard.bind(this)
    this.changeStatus = this.changeStatus.bind(this)

    this.state = {

      login: {
        username: 'null',
        password: 'null'
      },

      info: {
        petsName: 'null',
        gender: 'null',
        species: 'null',
        hairColour: 'null',
        lookingFor: 'null',
        description: 'null',
        food: 'null'
      },

      creditCard: {
        endDate: new Date(),
        cardHolderName: 'null',
        cardNumber: 'null',
        expiredTime: 'null',
        secureCode: 'null'
      },

      status: 'VIP'

    }
    
    bake_cookie("id", "no id")

  }

  //Change the current user object
  changeLogin(userLoggedIn) {
    this.setState({
      login: userLoggedIn,
      status: 'Normal User'
    }, () => { console.log(this.state); })
  }

  //Change the user and pets information
  changeUserInfo(userInfo) {
    this.setState({
      info: userInfo,
    }, () => {
      console.log(this.state);
    })
  }

  //Change the VIP and payment option
  changeCreditCard(creditCardInfo) {
    this.setState({
      creditCard: creditCardInfo,
      status: 'VIP'
    }, () => {
      console.log(this.state);
    })
  }

  //Change Status
  changeStatus(statusChanged) {
    this.setState({
      status: statusChanged
    }, () => {
      alert(`Logged In as ${this.state.status}`);
      console.log(this.state);
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>

            <Route exact path='/' render={() =>
              (<Main />)} />

            <Route exact path='/login' render={() =>
              (<Login
                changeLogin={this.changeLogin}
                changeUserInfo={this.changeUserInfo}
                changeStatus={this.changeStatus}
                changeCreditCard={this.changeCreditCard}
              />)} />

            <Route exact path='/register' render={() =>
              (<Register
                changeUserInfo={this.changeUserInfo}
              />)} />

            <Route exact path='/managepets' render={() =>
              (<ManagePets
                userInfo={this.state.info} 
                changeUserInfo={this.changeUserInfo}  
              />)} />

            <Route exact path='/upgrade' render={() =>
              (<Upgrade
                creditCard={this.state.creditCard}
                changeCreditCard={this.changeCreditCard} 
                changeUserInfo={this.changeUserInfo}
                />)} />

            <Route exact path='/findmatch' render={() =>
              (<FindMatch 
                vipEndingDate={this.state.creditCard.endDate}
              />)} />

            <Route exact path='/admin' render={() =>
              (<Admin />)} />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
