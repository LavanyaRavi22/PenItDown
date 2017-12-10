import React, { Component } from 'react';
import {db} from '../firebase';
import firebase from 'firebase';
import '../App.css';
import Cookie from 'universal-cookie';

class SharedList extends Component{
	constructor(){
		super();
		this.state = {
			documents : [],
			sharedNotes : []
		}
		this.openDocument = this.openDocument.bind(this);
	}

	componentDidMount(){
		db
			.collection('shares')
			.where('sharedTo','==',new Cookie().get('email'))
			.onSnapshot((query) => {
				if (query.docs.length > 0){
					 this.setState({documents : query.docs}, () => {
					 	this.state.documents.map((sharedWithMe) => {
					 		db
					 			.collection('notes')
					 			.doc(sharedWithMe.data().noteID)
					 			.get()
					 			.then((q) => 
					 				this.setState({
					 					sharedNotes : [...this.state.sharedNotes,q.data()]
					 				})
					 			);
					 	});
					 });
				}
			});
	}

	openDocument(){
		console.log(this.state);
	}

	render(){
		return(
			<div>
				{this.state && this.state.sharedNotes && 
					this.state.sharedNotes.map((document) => {
						return(
						<div className='userDocument' onClick={this.openDocument}>
							<h4 onClick={this.openDocument}>
								{document.noteTitle}
							</h4>
							{this.state.documents && 
								this.state.documents.map(doc => {
									return(
										<div>
											{(doc.data().noteID === document.id) &&
												<h6 style={{'text-decoration':'underline'}}>Shared by: {doc.data().sharedBy}</h6>
											}
										</div>
									);
								})
							}
							
							<p onClick={this.openDocument}>
								{document.notes}
							</p>
						</div>
					)})
				}
			</div>
		);
	}
}

export default SharedList;