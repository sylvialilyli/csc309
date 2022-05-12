import React from 'react';

import "./FindMatch.css";
import "./../global.css";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { Button, Grid } from "@material-ui/core";

import { read_cookie } from 'sfcookies'
import { withRouter } from 'react-router-dom';
import { findMatch, getMatch } from '../../actions/findmatch';


class FindMatch extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            match: {
                petsName: 'Developer',
                gender: 'female',
                species: 'Rose',
                hairColour: 'black',
                lookingFor: 'male',
                description: 'I am the backend developer, and we are truely sorry we dont have a match for you right now',
                food: 'Lily'
            },
            matchList: [],
            currentMatch: 0,
            findMatchable: true
        }
        
        if (read_cookie("id") === "no id") {
            alert("Please login first")
            this.props.history.push('/login');
            this.setState({
                findMatchable: false
            })
        } else if (this.props.vipEndingDate <= new Date()) {
            alert("Please upgrade first")
            this.props.history.push('/upgrade');
            this.setState({
                findMatchable: false
            })
        } else {
            getMatch(read_cookie("id"), this);
        }

    }

    render() {

        return !this.state.findMatchable ? (<div> </div>) : (
            <div id="Total">
                <Header />
                <div id="Find_match">
                    <div id="Banner">
                        <div id="Title">
                            <span>Find my match!</span>
                        </div>
                    </div>

                    <div id="MatchResult">
                        <Grid container id="FindMatchProfileInfo">
                            <Grid item className="findMatchProfileImg"> </Grid>
                            <Grid item id="FindMatchUserName">
                                <span>{this.state.match.petsName}</span>
                            </Grid>
                        </Grid>

                        <div id="FindMatchProfileDetails">
                            <div id="FindMarchProfileDescription">
                                <span>{`My name is ${this.state.match.petsName}, a ${this.state.match.gender} ${this.state.match.species} 
            looking for ${this.state.match.lookingFor}. I have a ${this.state.match.hairColour} hair and 
            I love ${this.state.match.food}! People always say that ${this.state.match.description}!`}</span>
                            </div>
                        </div>
                    </div>

                    <div id="MatchBtns">
                        <Button className="Button" id="FindMatchBtn" onClick={() => findMatch(this)} >Find Match</Button>
                    </div>



                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(FindMatch);