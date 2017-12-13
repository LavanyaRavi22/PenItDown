import React, { Component } from 'react';
import '../styles/App.css';

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<p>Penned over 
					<i className="fa fa-coffee"></i> 
					by 
					<a href="https://github.com/LavanyaRavi22">Lala</a> & 
					<a href="https://github.com/adarshlilha">Lilha</a>
					&nbsp;&nbsp;
				    <i className="fa fa-at"></i>
				    &nbsp;Jaaga Study Q4,2017&nbsp;
				    <i className="fa fa-leaf"></i>
				</p>
			</div>
		);
	}
}

export default Footer;