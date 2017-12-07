import React, { Component } from 'react';
import './App.css';

class Header extends Component {

	render() {
		return (
			<div className="col-lg-10 col-md-10 col-sm-9 headerDiv">
				<h2 className="text-center headerStyle"> Pen It Down </h2>
				<button className="fa fa-angle-left navBtn">  </button>
				<button className="fa fa-angle-right navBtn">  </button>
				<button className="fa fa-plus-square-o navBtn addDocBtn">  </button>
			</div>
		);
	}
}

export default Header;