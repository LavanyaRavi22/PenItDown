import React, { Component } from 'react';
import './App.css';

class Icon extends Component {
	constructor() {
		super();
		this.toggleDropDown = this.toggleDropDown.bind(this);
	}

	toggleDropDown(e) {
		e.preventDefault();
		var dropDown = document.querySelector(".dropDownIcon");
		dropDown.classList.toggle("hidden");
	}

	render() {
		return (
			<div className="text-center sideBarIcon">
				<img src="http://via.placeholder.com/300" className="userImg" />
				<button className="fa fa-angle-down dropdownBtn"
						onClick={this.toggleDropDown}> </button>
				<ul className="dropDownIcon hidden">
					<li className="listItem"
					    onClick={this.showProfile}> Edit Profile </li>
					<li className="listItem lastItem"> Log Out </li>
				</ul>
			</div>
		);
	}
}

export default Icon;