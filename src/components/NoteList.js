import React, { Component } from 'react';
import {db} from '../firebase';
import AddNote from './AddNote.js';
import '../App.css';

class NoteList extends Component{
	constructor(){
		super();
		this.state = {
			documents : [],
			openDoc : false,
			docID : null,
			title : null,
			noteBody : null
		};
		this.openDocument = this.openDocument.bind(this);
		this.closeNote = this.closeNote.bind(this);
	}

	componentDidMount() {
		db
			.collection('notes')
			.where('uid','==',this.props.getUID())
			.onSnapshot(col => {
				this.setState({documents : col.docs});
			});
	}

	async openDocument(e){
		e.preventDefault();
		await this.setState({openDoc : true,
			docID : e.target.id
		});
		await this.state.documents.map(doc => {
			if(doc.data().id === this.state.docID){
				 this.setState({
					title : doc.data().noteTitle,
					noteBody : doc.data().notes
				});
			}
			return null;
		});
	}

	closeNote(){
		this.setState({openDoc : false,title: null,noteBody: null});
	}

 	render() {
		return (
			<div>
				{this.state && this.state.openDoc && this.state.title && this.state.noteBody &&
					<AddNote noteID = {this.state.docID}
							 closeNote = {this.closeNote}
							 title = {this.state.title}
							 noteBody = {this.state.noteBody}
							 getUID = {this.props.getUID}/>
				}
				{this.state && this.state.documents.map((document) =>{	
					return (
						<div className='userDocument' 
							 id={document.data().id} 
							 onClick={this.openDocument}>
							<h4 id={document.data().id} 
							 	onClick={this.openDocument}>
							 {document.data().noteTitle}</h4>
							<p id={document.data().id} 
							   onClick={this.openDocument}>
							 {document.data().notes}</p>
						</div>
					)
				})
			}
			</div>	
		)
	}
}	

export default NoteList;