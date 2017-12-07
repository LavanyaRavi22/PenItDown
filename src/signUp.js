import React, { Component } from 'react';
import {db} from './firebase';
import firebase from 'firebase';
import './App.css';
let crypto = require('crypto');

class SignUp extends Component{
	constructor(){
		super();
		this.userSignup = this.userSignup.bind(this);
	}

	async userSignup(e){
    	e.preventDefault();
    	if (this.name.value && this.email.value && this.password.value && this.repeatPassword.value){
    		if (this.password.value === this.repeatPassword.value){
			    const newUser = db.collection('users').doc();
			    let isUserPresent = false;
			    await db.collection('users')
			      .where('email','==',this.email.value)
			      .get()
			      .then(function(querySnapshot){
			        if (querySnapshot.size > 0) {
			              isUserPresent = true;
			            }
			        });
    			if(isUserPresent) {
    			 alert('Email already registered!') }
			    else 
			    	{ 
			    		let salt = crypto.randomBytes(128).toString('hex');
				        let pswd = this.props.hashPassword(this.password.value,salt);
				    	newUser.set({
					      name : this.name.value,
					      email : this.email.value,
					      password : pswd
					    });
					    this.props.isLoggedIn();
					    
				}
  			}else{
    			alert("Passwords Mismatch");
  			}
  		}
  	}

	render(){
		return (
			<div> 
              <input type="text" 
                     placeholder="Full Name" 
                     ref={(input) => this.name = input}/>
              <input type="email" 
                     placeholder="Email" 
                     ref={(input) => this.email = input}/>
              <input type="password" 
                     placeholder="Password" 
                     ref={(input) => this.password = input}/>
              <input type="password" 
                     placeholder="Confirm Password" 
                     ref={(input) => this.repeatPassword = input}/>
              <button className="submitIt" 
                      onClick={this.userSignup}>
                  Sign Up
              </button>
              <p> Already a member ? &nbsp; 
                  <span onClick={this.props.newUser}
                  		className="pointIt">
                      Log In
                  </span>
              </p>
         	</div>
		);
	}
}

export default SignUp;