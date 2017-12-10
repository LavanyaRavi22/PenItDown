import React, { Component } from 'react';
import {db} from './firebase';
// import firebase from 'firebase';
import './App.css';
import Header from './header';
import SideBar from './sidebar';
import AddNote from './components/AddNote.js';
import Cookies from 'universal-cookie';
import NoteList from './components/NoteList';
import SharedList from './components/sharedList';

class Notes extends Component {
	constructor() {
		super();
		this.state = {
			newNote : false,
			noteID : null
		}
		this.addNewNote = this.addNewNote.bind(this);
		this.getUID = this.getUID.bind(this);
		this.closeNote = this.closeNote.bind(this);
	}

	addNewNote () {
		if(!this.state.newNote){
			const notes = db.collection('notes').doc();
			this.setState({newNote : true, noteID : notes.id});
			  notes.set({
			  	id : notes.id,
			  	noteTitle : "Untitled",
			  	notes : "Enter Text",
			  	uid : this.getUID()
			  })
		}
	}

	closeNote(){
		this.setState({newNote : false});
	}

	getUID(){
		const cookie = new Cookies();
		let uid = cookie.get('uid');
		return uid;
	}

	render() {
		return (
				<div className="wholePage">
					<SideBar cookieGet = {this.props.cookieGet} 
							 getUID = {this.getUID}/>
					<div className="mainContent">
						<Header addNewNote={this.addNewNote}/>
						<div>
						{this.state && this.state.newNote &&
							<AddNote noteID = {this.state.noteID}
									 closeNote = {this.closeNote}/>
						}
						<h4>My Pens</h4>
						<NoteList getUID = {this.getUID}
								  closeNote = {this.closeNote}
								  style = {{overflow : 'scroll'}}
								/>
						<h4 style={{clear:'both'}}>Shared Pens</h4>
						<SharedList />
						</div>
					</div>
				</div>
			)
	}
}

export default Notes;