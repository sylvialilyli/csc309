import React from 'react';
import { Link } from "react-router-dom";

import "./../global.css";
import "./Footer.css";

import { Container } from '@material-ui/core';

function Footer() {
	return (

		<div id='Footer'>
			<Container maxWidth='xl'>
				<Link to='/'>
				<img id='Logo_Square' src={require('./static/Asset_Logo S.png')} alt='footer logo'/>
				</Link>

				<div id='About_Us_Sub'>
					<div className='Subtitle' id='Footer_Title'> Find Your Date Today </div>
					<div className='Footer_Text' id='Footer_Text_First'> Our mission is simple: 
					to help singles find the kind of relationship they're looking for. And we think we're pretty good at it.
            </div>
				</div>

				<span className='Subliner'> </span>

				<div className='Footer_Text' id='Footer_Text_Second'> While love is universal, the way people meet, 
				court and develop relationships is far from it. 
				That's why Petinder.com offers the same approaches and features unique to different speices.
        </div>
			</Container>
		</div>
	);
}

export default Footer