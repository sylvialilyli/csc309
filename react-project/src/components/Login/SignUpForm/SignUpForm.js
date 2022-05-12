import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { bake_cookie, delete_cookie } from 'sfcookies'
import { Button, TextField } from '@material-ui/core';


class SignUpForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: '',
            password: '',
            re_password: ''
        }
    }

    /*
    Handle Textfield
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

    handleRePasswordChange = event => {
        this.setState({
            re_password: event.target.value
        })
    }

    /*
    Upload login to database
    */
    handleSubmit = event => {

        event.preventDefault()

        if (this.state.password !== this.state.re_password) {
            alert(`Password entered does not match, try again`)
            return;
        }

        // Create our request constructor with all the parameters we need
        const request = new Request("/signup", {
            method: "post",
            body: JSON.stringify({
                info: {
                    user: this.state.user,
                    password: this.state.password
                },
                status: "user"
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
                        alert("Username not availble")
                        return null;
                    case 500:
                        alert("Unknown Error")
                        return null;
                    default:
                        alert("Successfully Registered")
                        return res.json();
                }
            })
            .then(json => {

                if (json == null) {
                    return; //Error Occured
                }

                delete_cookie("id")
                bake_cookie("id", json._id)

                //Update app state
                this.props.changeLogin({
                    user: this.state.user,
                    password: this.state.password
                })

                this.props.history.push('/register')
            })
    }

    render() {
        return (

            <form onSubmit={this.handleSubmit} >

                <div className="Title">
                    <span> Sign Up. </span>
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
                    label="Password"
                    type="password"
                    onChange={this.handlePasswordChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Re-enter Password"
                    type="password"
                    onChange={this.handleRePasswordChange}
                />

                <Button className="Button" type="submit"> Sign up</Button>
            </form>

        )
    }
}

export default withRouter(SignUpForm);
