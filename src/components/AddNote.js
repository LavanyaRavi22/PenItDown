import React,{Component} from 'react';
import {db} from '../firebase';
import firebase from 'firebase';
import Cookie from 'universal-cookie';

class AddNote extends Component {
	constructor(props){
		super(props);
		this.state = {
			note : '',
			title : '',
			body : '',
			share : false
		};
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.changeShareState = this.changeShareState.bind(this);
		this.shareIt = this.shareIt.bind(this);
	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
  			if (user) {
  	  			console.log(user);
	  		}
		});
	}

	handleTextAreaChange(e) {
		e.preventDefault();
		const noteDoc = db.collection('notes').doc(this.props.noteID);
		if (e.target.name === "noteTitle"){
			noteDoc
				.update({noteTitle : this.noteTitle.value});
		}
		else if(e.target.name === "notes"){
			noteDoc
				.update({notes : this.notes.value});
		}
	}

	deleteNote(e){
		e.preventDefault();
		db
			.collection('notes')
			.doc(this.props.noteID)
			.delete();
		this.props.closeNote();

		db
			.collection('shares')
			.where('noteID','==',this.props.noteID)
			.onSnapshot(col => {
				if(col.docs.length > 0)
				{
					db.collection('shares')
						.doc(col.docs[0].id)
						.delete();
				}
			});
	}

	changeShareState(){
		this.setState({share : !this.state.share});
	}

	shareIt(){
		db.collection('shares')
			.doc()
			.set({
				noteID : this.props.noteID,
				sharedBy : new Cookie().get('email'),
				sharedTo : this.shareWith.value
			});
	}
	// async componentDidMount() {
	// 	console.log(this.props);
	// 	// this.setState({
 //  //     		title: this.props.title
 //  //   	},() => { console.log('new state', this.state); })
	// 	// await this.setState({
	// 	// 	title : this.props.title,
	// 	// 	body : this.props.noteBody
	// 	// });
	// 	// console.log(this.props.title);
	// 	// console.log(this.state);
	// }

	// async componentDidMount() {
	// 	console.log(this.props);

	// 	await this.setState({
	// 		title : this.props.title,
	// 		body : this.props.noteBody
	// 	});

	// 	console.log(this.state);
	// }
	
	render(){
		// console.log(this.state);
		return(
			<div className="col-md-10 col-sm-9 noteSection">
			
				<p className="newNoteTitle">New Note:</p>
				<input type="text" 
					   placeholder="Note's Title"
					   name = "noteTitle"
					   className = "noteTitleSection"
					   ref={(input) => this.noteTitle = input}
					   onChange = {this.handleTextAreaChange}
					   defaultValue = {this.props.title || "Untitled"}/>
				<textarea cols="60"
				 		  rows="10"
				 		  name = "notes"
				 		  placeholder="Give some text" 
				 		  className = "textAreaSection"
				 		  onChange={this.handleTextAreaChange}
				 		  ref={(input) => this.notes=input}
				 		  defaultValue = {this.props.noteBody || "Enter Text"}> 
				</textarea>
				<button onClick={this.props.closeNote}
						className ="fa fa-times closeNote">
				</button>
				<button onClick={this.deleteNote}
						className="fa fa-trash-o">
				</button>
				<button onClick={this.changeShareState}
						className="fa fa-share">
				</button>
				{this.state && this.state.share &&
					<div>
						<input type = "email" 
						placeholder = "Email of Receiver"
						ref={(shareWith) => this.shareWith = shareWith}/>
						<button onClick={this.shareIt}>Go Share!</button>
					</div>
				}
			</div>
		);
	}
}

export default AddNote;