import React, { Component } from 'react';
import './App.css';
import Folder from './folder';

class FolderNavigation extends Component {

	render() {
		return (
			//a loop over folders(check CommentList.js)
			<div className="folderStructure">
				<p className="folderHeader"> <span className="fa fa-folder"></span> Folders </p>
				<Folder />
			</div>
		);
	}

}

export default FolderNavigation;