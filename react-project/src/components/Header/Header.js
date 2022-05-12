import React from 'react';
import "./Header.css";
import "./../global.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Header(){
    return (
        <div id="Header">
			<Link className="header_button-link" to={"./../"}>
				<img id="Logo" src={ require('./../../Asset/Asset_Logo_V.jpg')} alt="logo" ></img>
			</Link>

			<ul id="Header_Main">
				<li>
					<Link className="header_button-link" to={"./../managepets"}>
						<Button className="header_button">Manage My Pets</Button>
					</Link>
				</li>
				<li>
					<Link className="header_button-link" to={"./../findmatch"}>
						<Button className="header_button">Find My Match</Button>
					</Link>
				</li>
				<li>
					<Link className="header_button-link" to={"./../upgrade"}>
						<Button className="header_button">Upgrade To VIP</Button>
					</Link>
				</li>
				<li>
					<Link className="header_button-link" to={""}>
						<Button className="header_button">About Us</Button>
					</Link>
				</li>
			</ul>

			{/* 
			Archieved: 

			<img id="Logo" src={ require('./static/Asset_Logo\ V.png')}></img>

			<div id="Header_Main">
				<span className="Header_Text"> Manage My Pets </span>
			    <span className="Header_Text"> Find My Match </span>
			    <span className="Header_Text"> Upgrade To VIP </span>
			    <span className="Header_Text"> About Us </span>
			</div> */}
		</div>
       
	);
}

export default Header