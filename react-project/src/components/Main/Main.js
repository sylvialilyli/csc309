import React from 'react';
import { Link } from "react-router-dom";

import "./MainStyle.css";
import "./../global.css";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

import Button from "@material-ui/core/Button";
import { read_cookie, bake_cookie, delete_cookie } from 'sfcookies';

class Main extends React.Component {

	/*
    Embed login and logout feature
    */
	logInButton = () => {

		if (read_cookie("id") === "no id") {
			return (<Link className="Button-link" to={"./../login"}>
				<Button className="Button" id="Main_Button">Login/Signup</Button>
			</Link>)
		} else {
			return (<Link className="Button-link" >
				<Button className="Button" id="Main_Button" onClick={() => {
					this.logout()
					delete_cookie("id")
					bake_cookie("id", "no id")
				}}>Log Out</Button>
			</Link>)
		}

	}

	/*
    Log out user from server
    */
	logout() {

		// Create our request constructor with all the parameters we need
		const request = new Request("/logout", {
			method: "post",
			body: JSON.stringify({
				_id: read_cookie("id")
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
						alert("Can not logged out, please refresh")
						return null;
					case 404:
						alert("Can not found user")
						return null;
					case 200:
						alert("Successfully log out")
						return res.json();
					default:
						alert("Unknown Error")
						return null;
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<Header />

				<div id="Hero_Space">
					<div id="Hero_Space_Left">
						<div className="Title">
							<span> The world <br /> BESTEVER <br /> pets dating website. </span>
						</div>
						<div id="Paragraph">
							<p> Petinder is a private, membership-based club where members can connect for dating,
							networking, or to find new friends. Accepted members will have the option to purchase
									1, 3 or 6 month memberships. </p>
						</div>

						{this.logInButton()}

					</div>
					<img src={require('./../../Asset/Picture_Hero_Image.png')} alt='hero_image' id='Hero_Image'></img>
				</div>

				<div id="Events">

					<div className="Event">
						<img src={require('./../../Asset/Picture_Event_1.png')} alt='event_1' className='mainEvent'></img>
						<div className="Event_Text">
							<p> If you're one of the many single professional programmer in the city
							who would like to meet some great people to date
							(and you'd really rather not date anyone in the office!),
									you'll probably want to come to our most popular theme of "Single Programmer".  </p>
						</div>
					</div>

					<div className="Event">
						<img src={require('./../../Asset/Picture_Event_2.png')} alt='event_1' className='mainEvent'></img>
						<div className="Event_Text">
							<p> The perfect opportunity to find a companion for concerts, festivals or shows.
									Unleash your inner foodie, adventure junkie or health and wellness guru with someone just like yourself.</p>
						</div>
					</div>

					<div className="Event">
						<img src={require('./../../Asset/Picture_Event_3.png')} alt='event_1' className='mainEvent'></img>
						<div className="Event_Text">
							<p> Our events offer a fresh alternative to speed dating and matchmaking.
							We don't find anything romantic about whistles, name-tags or over-the-top
							party trimmings typically found at singles events so we have dosne away with them.
									Creating an atmosphere that is at once casual and comfortable. It's what we call cheeky-chic!</p>
						</div>
					</div>

				</div>

				<div id="About_Us">

					<div id="About_Us_Left">

						<img src={require('./../../Asset/Picture_About_Us_Big.png')} alt='event_3' className='About_Us_Big'></img>

						<div id="MainText_Left">
							<p> Launched on the Web in April of 2020, Petinder.com helped pioneer the online dating
							industry and now services 1 countries and territories and hosts Web sites in
							1 languages. We create romantic opportunities so singles are more likely
									to find someone special. we've come a long way since 2020.  </p>
						</div>

					</div>

					<div id="About_Us_Right">

						<div className="Title" id="About_Us_Title">
							<span> About <br /> Us. </span>
						</div>

						<div>
							<img src={require('./../../Asset/Picture_About_Us_Small.png')} alt='event_3' className='About_Us_Small'></img>

							<div id="MainText_Right">
								<p> Over the years, we've learned more and more about what people want—and the
								tools they need to help take the lottery out of love. With more ways than ever to bring
									singles together. </p>
							</div>
						</div>

					</div>
				</div>
				<Footer />
			</div>
		)
	}
}

export default Main;