import React, { Component } from 'react';
import {db} from '../firebase';
import firebase from 'firebase';
import '../styles/App.css';
import Cookie from 'universal-cookie';
import ViewNote from './viewNote';

class SharedList extends Component{
	constructor(){
		super();
		this.state = {
			documents : [],
			sharedNotes : [],
			openDoc : false,
			title : null,
			noteBody: null,				//to open the shared doc
			showModal : false,
			edit: null
		}
		this.openDocument = this.openDocument.bind(this);
		this.closeNote = this.closeNote.bind(this);
	}

  	closeNote(){
		this.setState({openDoc : false,title: null,noteBody: null,showModal:false});
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

	async openDocument(e){
		e.preventDefault();
		await this.setState({
			openDoc:true,
			docID:e.target.id,
			showModal: true
			});

		await this.state.sharedNotes.map(doc => {
			if(doc.id === this.state.docID){
				console.log("in here");
				 this.setState({
					title : doc.noteTitle,
					noteBody : doc.notes
				});
			}
			return null;
		});

		this.state.documents.map(async (doc) => {
			if(this.state.docID === doc.data().noteID)
			{
				await this.setState({edit : doc.data().write});
				//console.log(doc.data());
			}
		})
	}

	render(){
		return(
			<div className="noteList">
				{this.state && this.state.sharedNotes && 
					this.state.sharedNotes.map((document) => {
						return(
						<div className='userDocument' 
						     id={document.id} 
							 onClick={this.openDocument}>
							<h4 onClick={this.openDocument}
								id={document.id}>
								{document.noteTitle}
							</h4>
							{this.state.documents && 
								this.state.documents.map(doc => {
									return(
										<div>
											{(doc.data().noteID === document.id) &&
												<h6 style={{textDecoration:'underline'}}
													id={document.id}>
													Shared by: {doc.data().sharedBy}
												</h6>
											}
										</div>
									);
								})
							}
							
							<p onClick={this.openDocument}
							   id={document.id}>
								{document.notes}
							</p>
						</div>
					)})
				}

				{this.state && this.state.openDoc && this.state.title 
					&& this.state.noteBody &&
					<ViewNote showModal = {this.state.showModal}
							  noteID = {this.state.docID}
							  closeNote = {this.closeNote}
							  title = {this.state.title}
							  noteBody = {this.state.noteBody} 
							  shared = {true}
							  edit = {this.state.edit}/>
				}
				
			</div>
		);
	}
}

export default SharedList;