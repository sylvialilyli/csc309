import React from 'react';
import { withRouter } from 'react-router-dom';

//Import style sheets and stylish item
import "./ManagePets.css";
import "./../global.css";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

import EditCancelTextBar from "./EditCancelTextBar/EditCancelTextBar"

import { read_cookie } from 'sfcookies'

class ManagePets extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            userInfo: this.props.userInfo,
            managePetable: true
        }
        
        if (read_cookie("id") === "no id"){
            alert("Please login first")
            this.props.history.push('/login');
            this.setState({
                managePetable: false
            })
        }

    }

    render() {

        return  !this.state.managePetable ? (<div> </div>) : (
            <div>
                <Header />

                <div id="Manage_Pets">
                    <div id="Banner">
                        <div id="Title">
                            <span>Hi {this.state.userInfo.petsName},</span>
                            <span> Looking good today.</span>
                        </div>
                    </div>

                    <div id="ProfileInfo">
                        <div id="ProfileImage">

                            <img src={require('./../../Asset/Picture_UserPic.png')} alt='hero_image' className='profileImg'></img>

                            <div className="profileSubImg">
                            </div>
                            <div id="userName">
                                <span>{this.state.userName}</span>
                            </div>
                        </div>

                        <div id="ProfileText">
                            <EditCancelTextBar 
                            changeUserInfo={this.props.changeUserInfo}
                            userInfo={this.state.userInfo}
                            />
                        </div>

                    </div>
                </div>
                <Footer />
            </div >

        );


    }

}

export default withRouter(ManagePets);