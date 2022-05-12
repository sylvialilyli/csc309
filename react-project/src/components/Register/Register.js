import React from 'react';
import { withRouter } from 'react-router-dom';

import "./Register.css";
import "./../global.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { TextField, Button, Grid, FormControlLabel, RadioGroup, FormLabel, Checkbox, Radio } from '@material-ui/core';
import { read_cookie } from 'sfcookies';


class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            petsName: 'String',
            gender: 'String',
            species: 'String',
            hairColour: 'String',
            lookingFor: 'Female',
            description: 'String',
            food: ''
        }
    }


    HandleNameChange = event => {
        this.setState({
            petsName: event.target.value
        })
    };

    HandlegenderChange = event => {
        this.setState({
            gender: event.target.value
        })
    };

    HandleSpeciesChange = event => {
        this.setState({
            species: event.target.value
        })
    };

    HandleHairColorChange = event => {
        this.setState({
            hairColour: event.target.value
        })
    };

    HandleGenderSeekingChange = event => {
        this.setState({
            lookingFor: event.target.value
        })
    };

    HandleDescriptionChange = event => {
        this.setState({
            description: event.target.value
        })
    };

    HandleFoodChange = event => {
        this.setState({
            food: event.target.value
        })
    };

    handleSubmit = event => {

        event.preventDefault()

        // Create our request constructor with all the parameters we need
        const request = new Request("/register", {
            method: "post",
            body: JSON.stringify({
                _id: read_cookie("id"),
                info: {
                    petsName: this.state.petsName,
                    gender: this.state.gender,
                    species: this.state.species,
                    hairColour: this.state.hairColour,
                    lookingFor: this.state.lookingFor,
                    description: this.state.description,
                    food: this.state.food
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
                        alert("You just lost your account")
                        break;
                    case 500:
                        alert("Unknown Error")
                        break;
                    default:
                        //Update app state
                        this.props.changeUserInfo({
                            petsName: this.state.petsName,
                            gender: this.state.gender,
                            species: this.state.species,
                            hairColour: this.state.hairColour,
                            lookingFor: this.state.lookingFor,
                            description: this.state.description,
                            food: this.state.food
                        })
                        this.props.history.push('/');
                        break;
                }
            }).catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div id="Total">
                <Header />
                <div id="Content">

                    <div className="Title">
                        <span> Register Your Pets. </span>
                    </div>

                    <form onSubmit={this.handleSubmit}>

                        <Grid container spacing={5}>

                            <Grid item sm={6}>
                                <TextField
                                    required
                                    label="Name"
                                    fullWidth
                                    onChange={this.HandleNameChange}
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    required
                                    label="Species"
                                    fullWidth
                                    onChange={this.HandleSpeciesChange}
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    label="Hair Color" fullWidth required
                                    onChange={this.HandleHairColorChange} />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    label="Favourt Food" fullWidth required
                                    onChange={this.HandleFoodChange} />
                            </Grid>

                            <Grid item sm={6}>
                                <FormLabel >My pet is</FormLabel>
                                <RadioGroup onChange={this.HandlegenderChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </Grid>


                            <Grid item sm={6}>
                                <FormLabel>Looking for</FormLabel>
                                <RadioGroup onChange={this.HandleGenderSeekingChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </Grid>

                            <Grid item sm={12}>
                                <TextField
                                    required
                                    label="Short Description"
                                    fullWidth
                                    onChange={this.HandleDescriptionChange} />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="I like cats"
                                />
                            </Grid>
                            <Button className="Button" type="submit"> Register </Button>
                        </Grid>
                    </form>

                </div>
                <Footer />
            </div>


        );

    }
}
export default withRouter(Register);