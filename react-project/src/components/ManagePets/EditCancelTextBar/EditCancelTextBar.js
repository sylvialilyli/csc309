import React, { Component } from 'react'
import { TextField, Button, Grid, FormControlLabel, RadioGroup, FormLabel, Radio } from '@material-ui/core';

import { read_cookie } from 'sfcookies'

class EditCancelTextBar extends Component {

    constructor(props) {

        super(props);

        let userInfo = this.props.userInfo

        this.state = {

            isInEditMode: false, //The edit mode flag

            //Store current user information
            petsName: userInfo.petsName,
            gender: userInfo.gender,
            species: userInfo.species,
            hairColour: userInfo.hairColour,
            lookingFor: userInfo.lookingFor,
            description: userInfo.description,
            food: userInfo.food
        }
    }

    //Change Edit Mode
    changeEditMode = () => {
        this.setState({ isInEditMode: !this.state.isInEditMode })
    }

    /*
    Update info to database
    */
    updateComponentValue = event => {

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

        this.setState({
            isInEditMode: false,
        })

    }

    /*
    Textfield Handler
    */
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

    //Render Edit View
    renderEditView = () => {
        return <div id="profileDescription">
            <Grid container spacing={5}>

                <Grid item sm={6}>
                    <TextField
                        required
                        value={this.state.petsName}
                        label="Name"
                        fullWidth
                        onChange={this.HandleNameChange}
                    />
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        required
                        value={this.state.species}
                        label="Species"
                        fullWidth
                        onChange={this.HandleSpeciesChange}
                    />
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        required
                        value={this.state.hairColour}
                        label="hairColour"
                        fullWidth
                        onChange={this.HandleHairColorChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        value={this.state.food}
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
                        value={this.state.description}
                        required
                        label="Short Description"
                        fullWidth
                        onChange={this.HandleDescriptionChange} />
                </Grid>

            </Grid>

            <Button className="Button" id="ManagePetsProfileEditBtn" onClick={this.updateComponentValue}>OK</Button>
        </div>
    }

    //Render Display View
    renderDefaultView = () => {
        return (
            <div id="profileDescription">
                <span>{`My name is ${this.state.petsName}, a ${this.state.gender} ${this.state.species} 
            looking for ${this.state.lookingFor}. I have a ${this.state.hairColour} hair and 
            I love ${this.state.food}! People always say that ${this.state.description}!`}</span>
                <Button onClick={this.changeEditMode} className="Button" id="ManagePetsProfileEditBtn">Edit</Button>
            </div>
        )
    }

    render() {
        return (
            this.state.isInEditMode ?
                this.renderEditView() :
                this.renderDefaultView()
        )
    }
}

export default EditCancelTextBar;
