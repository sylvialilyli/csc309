import React from 'react';
import { Link, withRouter } from "react-router-dom";
import date from 'date-and-time';

import "./Upgrade.css";
import "./../global.css";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { TextField, Button, Grid, FormControlLabel, RadioGroup, FormLabel, Radio } from '@material-ui/core';

import { read_cookie } from 'sfcookies'

class Upgrade extends React.Component {

    constructor(props) {
        super(props)

        this.state = { //User upgrade information
            endDate: Date,
            cardHolderName: String,
            cardNumber: String,
            expiredTime: String,
            secureCode: String,
            upgradable: true 
        }

        if (read_cookie("id") === "no id") { //If user not logged in 
            alert("Please login first")
            this.props.history.push('/login');
            this.setState({
                upgradable: false
            })
        }

    }

    /*
    Handling Text box
    */
    HandleAddCredit = event => {
        let vipEndDate = date.addMonths(this.props.creditCard.endDate, Number(event.target.value))
        this.setState({
            endDate: vipEndDate
        })
    };

    HandleCardHolderName = event => {
        this.setState({
            cardHolderName: event.target.value
        })
    };

    HandleCardNumber = event => {
        this.setState({
            cardNumber: event.target.value
        })
    };

    HandleExpiredTime = event => {
        this.setState({
            expiredTime: event.target.value
        })
    };

    HandleSecureCode = event => {
        this.setState({
            secureCode: event.target.value
        })
    };

    /*
    Update user credit card information to server
    */
    handleSubmit = event => {

        event.preventDefault()

        // Create our request constructor with all the parameters we need
        const request = new Request("/upgrade", {
            method: "post",
            body: JSON.stringify({
                _id: read_cookie("id"),
                creditCard: {
                    endDate: this.state.endDate,
                    cardHolderName: this.state.cardHolderName,
                    cardNumber: this.state.cardNumber,
                    expiredTime: this.state.expiredTime,
                    secureCode: this.state.secureCode
                }
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
                    case 404:
                        alert("Insufficient Fund")
                        break;
                    case 200: //If Success

                        alert(`Upgrade Successfully, Your Ending VIP ends at ${this.state.endDate}`);

                        //Update database
                        this.props.changeCreditCard({
                            endDate: this.state.endDate,
                            cardHolderName: this.state.cardHolderName,
                            cardNumber: this.state.cardNumber,
                            expiredTime: this.state.expiredTime,
                            secureCode: this.state.secureCode
                        })
                        this.props.history.push('/');
                        break;
                    default:
                        alert("Unknown Error")
                        break;
                }
            }).catch(error => {
                console.log(error);
            });
    }


    render() {
        return !this.state.upgradable ? (<div> </div>) : (
            <div id="Total">
                <Header />
                <div id="Upgrading">
                    <div id="Account_Difference">

                        <div className="Account">
                            <div className="Title">
                                <span> VIP Account </span>
                            </div>
                            <p>Upgrade to our VIP today! And you can have the amazing feature of finding your match
                            on one click! Infinite matches are found just for you! It's amazing!
                            </p>
                        </div>

                        <span className="Subliner" id="Upgrade_Subliner"> </span>

                        <div className="Account">
                            <div className="Title">
                                <span> Free Account </span>
                            </div>
                            <p>
                                Or you can still use the free account and miss all the fun and excitment of finding
                                 you true matches via our wonderful finding match algorithm!</p>
                        </div>

                    </div>

                    <div id="Payment">

                        <div className="Title">
                            <span>Payment</span>
                        </div>

                        <Grid container spacing={5}>

                            <Grid item sm={6}>

                                <TextField
                                    label='Cardholder Name'
                                    variant='outlined'
                                    fullWidth required
                                    onChange={this.HandleCardHolderName} />
                            </Grid>

                            <Grid item sm={6}>

                                <TextField
                                    label='Card Number'
                                    variant='outlined'
                                    fullWidth required
                                    onChange={this.HandleCardNumber} />
                            </Grid>

                            <Grid item sm={3}>

                                <TextField
                                    label='Expired Year | Month'
                                    variant='outlined'
                                    fullWidth required
                                    onChange={this.HandleExpiredTime} />
                            </Grid>

                            <Grid item sm={3}>

                                <TextField
                                    label='Secure Code'
                                    variant='outlined'
                                    fullWidth required
                                    onChange={this.HandleSecureCode} />
                            </Grid>

                            <Grid item sm={6}>
                                <FormLabel >Add Credit</FormLabel>
                                <RadioGroup row required onChange={this.HandleAddCredit}>
                                    <FormControlLabel value='1' control={<Radio />} label="1 Month" />
                                    <FormControlLabel value='3' control={<Radio />} label="3 Month" />
                                    <FormControlLabel value='12' control={<Radio />} label="12 Month" />
                                </RadioGroup>
                            </Grid>

                        </Grid>
                    </div>

                </div>
                <div id="Upgrade_now">
                    <Link className="Button-link" to={""}>
                        <Button className="Button" onClick={this.handleSubmit}> Upgrade now</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );


    }

}

export default withRouter(Upgrade);
