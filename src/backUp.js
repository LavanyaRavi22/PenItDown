import React, { Component } from 'react';
import {db} from './firebase';
import firebase from 'firebase';
import './App.css';
let crypto = require('crypto');

class App extends Component {
  constructor() {
    super();
    this.state = { loginUser : true, user : []}
    this.newUser = this.newUser.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.userSignup = this.userSignup.bind(this);
  }

  newUser() {
    this.setState({loginUser : !this.state.loginUser});
  }

  userLogin(e){
    e.preventDefault();

    console.log(this.email.value,this.password.value);
  }

  async userSignup(e){
    e.preventDefault();
    if (this.name.value && this.email.value && this.password.value && this.repeatPassword.value){
    if (this.password.value === this.repeatPassword.value){
    const newUser =db.collection('users').doc()
    let isUserPresent = false;
    await db.collection('users')
      .where('email','==',this.email.value)
      .get()
      .then(function(querySnapshot){
        if (querySnapshot.size > 0) {
              isUserPresent = true;
            }
        });
    isUserPresent ? alert('Email already registered!') :  
    newUser.set({
      name : this.name.value,
      email : this.email.value,
      password : this.password.value
    });
    this.name.value = null
    this.email.value = null
    this.password.value = null
    this.repeatPassword.value = null
  }else{
    alert("Passwords Mismatch");
  }
  }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="title">Pen it Down</h1>
        </header>
        <form className="center">
        { this.state.loginUser 
        ? <div>
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
            <p> No Account? 
                <span onClick={this.newUser}>
                    Sign Up
                </span>
            </p>
        </div>
        : <div> 
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
              <p>
                  <span onClick={this.newUser}>
                      Log In
                  </span>
              </p>
         </div>
        }
        </form>
      </div>
    );
  }
}

export default App;








db
      .collection('notes')
      .where('uid','==',this.props.getUID())
      .get()
      .then((userNotes) => {
        this.setState({documents : userNotes.docs});
        console.log(this.state.documents);
      });
