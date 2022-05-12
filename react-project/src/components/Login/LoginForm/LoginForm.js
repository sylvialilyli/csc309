import React, { Component } from 'react'

import { Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';

import { bake_cookie, delete_cookie } from 'sfcookies'
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: String,
      password: String,
      loginAsAdmin: false,
    }
  }

  /*
  Handling Textfields
  */
  handleUsernameChange = event => {
    this.setState({
      user: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  //Handle Admin Login
  handleAsAdminLogin = event => {
    this.setState({
      loginAsAdmin: !this.state.loginAsAdmin,
    })
  }
  
  //Communicate from the database
  handleSubmit = event => {

    event.preventDefault()

    const userStatus = this.state.loginAsAdmin ? 'admin' : 'user'

    // Create our request constructor with all the parameters we need
    const request = new Request("/login", {
      method: "post",
      body: JSON.stringify({
        login: {
          user: this.state.user,
          password: this.state.password
        },
        status: userStatus
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });

    //Fetch user information from the database
    fetch(request)
      .then(res => {
        switch (res.status) {
          case 400:
            alert("Username or Password not found")
            return null;
          case 404:
            alert("User not found")
            return null;
          case 200:
            alert("Successfully logged in")
            return res.json();
          default:
            alert("Unknown Error")
            return null;
        }
      })
      .then(json => {

        if (json == null) {
          return; //Error Occured
        }

        //Store User id as cookie
        delete_cookie("id")
        bake_cookie("id", json._id)

        if (this.state.loginAsAdmin) {
          this.props.changeStatus('admin')
          this.props.history.push('/admin')
        } else {
          
          //Update app state
          this.props.changeLogin(json.login)
          this.props.changeUserInfo(json.info)

          console.log(json.info);

          if (json.creditCard !== null){
            this.props.changeCreditCard(json.creditCard)
          }

          this.props.changeStatus('user')
          this.props.history.push('/')
        }
      })
      .catch(error => {
        console.log(error);
      });

  }

  render() {
    return (

      <form onSubmit={this.handleSubmit}>

        <div className="Title">
          <span> Login. </span>
        </div>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          onChange={this.handleUsernameChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={this.handlePasswordChange}
        />


        <FormControlLabel
          control={<Checkbox value="true" color="primary"
            onChange={this.handleAsAdminLogin} />}
          label="As admin"
        />

        <Button className="Button" type="submit">
          Sign In
          </Button>

      </form>
    )

  }
}

export default withRouter(LoginForm);
