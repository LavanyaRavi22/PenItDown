import React, { Component } from 'react';
import {db} from './firebase';
import firebase from 'firebase';
import './App.css';

class LogIn extends Component{
	constructor(){
		super();
		this.userLogin = this.userLogin.bind(this);
	}

	async userLogin(e){
	    e.preventDefault();
	    if(this.email.value && this.password.value) {
	    	var pswd,salt,hashPswd;
	    	let isUserPresent = false;
	    	await db.collection('users')
	    	  .where('email','==',this.email.value)
	    	  .get()
	    	  .then(function(querySnapshot){
	    	  	if(querySnapshot.size)
	    	  	{
	    	  		pswd = querySnapshot.docs[0].data().password;
	    	  		salt = pswd.split('$')[0];
	    	  		hashPswd = pswd.split('$')[1];
	    	  		isUserPresent = true;
	    	  	}
	    	  	else
	    	  	{
	    	  		alert("Not registered with us yet!");
	    	  	}
	    	  });
	    	if(isUserPresent) {
		    	let checkPassword = this.props.hashPassword(this.password.value,salt);
		  		(checkPassword.split("$")[1] === hashPswd)
			  		? this.props.isLoggedIn()
			  		: alert('Incorrect Password. Try again!')
		  		
		  	}
		}
  	}

	render(){
		return (
			<div>
	            <input type="email" 
	                   placeholder="Email" 
	                   ref={input => this.email = input}/>
	            <input type="password" 
	                   placeholder="Password" 
	                   ref={input => this.password = input}/>
	            <button className="submitIt" 
	                    onClick={this.userLogin}>
	              Log In
	            </button>
	            <p> No Account ?&nbsp; 
	                <span onClick={this.props.newUser}
	                	  className="pointIt">
	                    Sign Up
	                </span>
	            </p>
        	</div>
		);
	}
}

export default LogIn;