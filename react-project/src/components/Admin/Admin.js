import React from 'react';
import { withRouter } from 'react-router-dom';

import "./AdminStyle.css";
import "./../global.css";
import { Button, Typography, Grid, TextField } from "@material-ui/core";
import PieChart, { Series, Legend, Tooltip, } from 'devextreme-react/pie-chart';
import { myPalette, customizeTooltip } from "./pie"

import CountUp from 'react-countup';
import { getStats, deleteUser } from "../../actions/admin"

import { bake_cookie, delete_cookie } from 'sfcookies';

//Admin's Dashboard page
class Admin extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            numRegistered: undefined, //Record Number of gistered
            data: [ //Record Number of VIP/Non-VIP user
                {
                    name: "VIP user",
                    value: undefined
                }, {
                    name: "Non-VIP user",
                    value: undefined
                }

            ],
            userToBeDeleted: String //Record User to be deleted 
        }
    }

    componentDidMount() {
        getStats(this)
    }

    //Handling textbox
    HandleDeleteUser = event => {
        this.setState({
            userToBeDeleted: event.target.value
        })
    };


    render() {

        let pie;
        if (this.state.data[0].value && this.state.data[1].value) {
            console.log(this.state.data)
            pie = <PieChart
                id="pie"
                type="doughnut"
                innerRadius={0.75}
                palette={myPalette}
                dataSource={this.state.data}>
                <Series argumentField="name" valueField="value">
                </Series>
                <Legend visible={true} horizontalAlignment="horizontal" />
                <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                </Tooltip>
            </PieChart>
        } else {
            pie = <span>{" "}</span>
        }

        return (
            <div>
                <div id="Admin_Board">
                    <div id="Banner">
                        <div id="Title">
                            <span>Admin Dashboard</span>
                        </div>
                    </div>

                    <div id="AdminStatsBoard" className="adminboard">
                        <div id="AdminStatsTitle" className="adminSecondTitle">
                            <span>Website Statistics</span>
                        </div>
                        <Grid id="adminStats" container>
                            <Grid id="AdminRegistered" className="adminStat" item xs={3}>
                                <Typography gutterBottom variant="h5">Registered User</Typography>
                                <Typography id="AdminRegisteredNum" variant="h1" align="center" color="textPrimary">
                                    {this.state.numRegistered ? <CountUp end={parseInt(`${this.state.numRegistered}`, 10)} duration={1.5} />
                                        : <span>{" "}</span>}
                                </Typography>
                            </Grid>
                            <Grid id="AdminVip" className="adminStat" item xs={3}>
                                <Typography id="AdminVipTitle" gutterBottom variant="h5">VIP User</Typography>
                            </Grid>
                            {pie}
                        </Grid>

                        <div id="vipNum">
                            <Typography gutterBottom variant="h5" color="textPrimary">VIP User</Typography>
                            <Typography id="AdminRegisteredNum" variant="h2" align="center" color="textPrimary">
                                {this.state.data[0].value ? <CountUp end={parseInt(`${this.state.data[0].value}`, 10)} duration={1.5} />
                                    : <span>{" "}</span>}
                            </Typography>
                        </div>

                        <Button className="Button" id="AdminUpdateStatsBtn" onClick={() => { getStats(this) }}>Update</Button>

                    </div>

                    <div id="AdminProfileManager" className="adminboard">
                        <div className="adminSecondTitle">
                            <span> Delete User </span>
                        </div>

                        <div id="AdminProfileSearch">
                            <div id="adminProfileSearchBar">
                                <TextField
                                    label='User Delete'
                                    variant='outlined'
                                    fullWidth required
                                    onChange={this.HandleDeleteUser} />
                            </div>

                            <Button className="Button" id="adminProfileSearchBtn" onClick={() => { deleteUser(this) }}> Confirm </Button>
                                <Button className="Button" id="Main_Button" onClick={() => {
                                    delete_cookie("id")
                                    bake_cookie("id", "no id")
                                    this.props.history.push('/')
                                }}>Log Out</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Admin);