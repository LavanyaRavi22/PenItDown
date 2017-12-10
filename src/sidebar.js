import React, { Component } from 'react';
import './App.css';
import {db} from './firebase';
import Icon from './icon';
import FolderNavigation from './folderNavigation';

class SideBar extends Component {
	constructor(){
		super();
		this.state = {
			fullName : null
		}
		//this.getUID = this.getUID.bind(this);
	}

	async getUID(){
		await db.collection('users')
			.where('uid','==',this.props.getUID())
			.onSnapshot((query) => {
				if (query.docs.length > 0)
					this.setState({fullName : query.docs[0].data().name})
			});
	}

	componentDidMount() {
		this.getUID();
	}


	render() {
		return (
			<div className="sideBarSizeDef">
				<Icon cookieGet={this.props.cookieGet}
					  name = {this.state.fullName}
					  getUID = {this.props.getUID}/>
				<p className="nameOfUser"> Hi, {this.state.fullName}!</p>
				<FolderNavigation />
			</div>
		);
	}

}

export default SideBar;