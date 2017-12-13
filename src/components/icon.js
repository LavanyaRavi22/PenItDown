import React, { Component } from 'react';
import '../styles/App.css';
import Cookies from 'universal-cookie';
import EditProfile from './editProfile';

class Icon extends Component {
	constructor() {
		super();
		this.toggleDropDown = this.toggleDropDown.bind(this);
		this.logOut = this.logOut.bind(this);
		this.editProfile = this.editProfile.bind(this);
		this.state = {editProfile : false};
	}

	toggleDropDown(e) {
		e.preventDefault();
		var dropDown = document.querySelector(".dropDownIcon");
		dropDown.classList.toggle("hidden");
	}

	logOut(){
		console.log("In here");
		const cookie = new Cookies();
    	cookie.remove('uid','email');
    	this.props.cookieGet();
	}

	editProfile() {
		this.setState({editProfile : !this.state.editProfile});
	}

	render() {
		return (
			<div className="text-center sideBarIcon">
				<img src="http://via.placeholder.com/300" className="userImg" alt="User Avatar"/>
				<button className="fa fa-angle-down dropdownBtn"
						onClick={this.toggleDropDown}> </button>
				<ul className="dropDownIcon hidden">
					<li className="listItem"
					    onClick={this.editProfile}> Edit Profile </li>
					    {this.state && this.state.editProfile && 
					    	<EditProfile name={this.props.name}
					    	getUID = {this.props.getUID}
					    	logOut = {this.logOut} 
					    	editProfile = {this.editProfile} />
					    }
					<li className="listItem lastItem" onClick={this.logOut} >Log Out </li>
				</ul>
			</div>
		);
	}
}

export default Icon;