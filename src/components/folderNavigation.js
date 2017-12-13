import React, { Component } from 'react';
import '../styles/App.css';
import Files from './folder';
import {db} from '../firebase';

class FolderNavigation extends Component {
	constructor(){
		super();
		this.state={
			documents : []
		}
	}

	 componentDidMount() {
		 db
			.collection('notes')
			.where('uid','==',this.props.getUID())
			.onSnapshot(col => {
				if(col.docs.length > 0)
				{
				 this.setState({documents : col.docs},() =>
					console.log(this.state.documents[0].data()));
				}
			});
	}

	render() {
		return (
			//a loop over folders(check CommentList.js)
			<div className="folderStructure">
				<p className="folderHeader"> 
				<span className="fa fa-folder"></span> Recent Pens </p>
				<ul>
				{this.state && this.state.documents &&
					this.state.documents.map((doc) => {
						return (
							
							<Files title={doc.data().noteTitle} />
						)
					})
				}
				</ul>
			</div>
		);
	}

}

export default FolderNavigation;