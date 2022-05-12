import React from 'react';

//Import style sheets and stylish item
import "./LoginStyle.css";
import "./../global.css";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

//Import Signup Login Forum
import SignUpForm from "./SignUpForm/SignUpForm"
import LoginForm from "./LoginForm/LoginForm"

class Main extends React.Component {

	render() {
		return (
			<div className="App">
				<Header />

				<div id="Login">

					<div className="Set">
						<SignUpForm changeLogin={this.props.changeLogin} />
					</div>

					<span className="Subliner" id="Login_Subliner"> </span>

					<div className="Set">
						<LoginForm
							changeLogin={this.props.changeLogin}
							changeUserInfo={this.props.changeUserInfo}
							changeStatus={this.props.changeStatus}
							changeCreditCard={this.props.changeCreditCard}
						/>
					</div>

				</div>
				<Footer />
			</div>
		)
	}
}

export default Main;