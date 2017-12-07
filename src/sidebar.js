import React, { Component } from 'react';
import './App.css';
import Icon from './icon';
import FolderNavigation from './folderNavigation';

class SideBar extends Component {

	render() {
		return (
			<div className="col-lg-2 col-md-2 col-sm-3 sideBarSizeDef">
				<Icon />
				<FolderNavigation />
			</div>
		);
	}

}

export default SideBar;