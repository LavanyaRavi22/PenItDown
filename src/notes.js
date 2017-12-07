import React, { Component } from 'react';
import {db} from './firebase';
import firebase from 'firebase';
import './App.css';
import Header from './header';
import SideBar from './sidebar';

class Notes extends Component {

	render() {
		return (
				<div className="wholePage">
					<SideBar />
					<Header />
				</div>
			)
	}
}

export default Notes;