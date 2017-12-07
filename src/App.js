import React, { Component } from 'react';
import {db} from './firebase';
import firebase from 'firebase';
import './App.css';
import SignUp from './signUp';
import LogIn from './logIn';
import Notes from './notes';
let crypto = require('crypto');

class App extends Component {
  constructor() {
    super();
    this.state = { loginUser : true,
                   isLoggedIn : false };
    this.newUser = this.newUser.bind(this);
    this.hashPassword = this.hashPassword.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  newUser() {
    this.setState({loginUser : !this.state.loginUser});
  }

  hashPassword(input,salt) {
    let hash = crypto.pbkdf2Sync(input,salt,10000,256,'sha512');
    return [salt,hash.toString('hex')].join("$");
  }

  isLoggedIn() {
    this.setState({isLoggedIn : !this.state.isLoggedIn});
  }

  render() {
    return (
      // <Notes />
      <div className="wholePage">
         { this.state.isLoggedIn
         ? <Notes />
         : <div className="App">
            <header>
              <h1 className="title">Pen it Down</h1>
            </header>
            <form className="center">
            { this.state.loginUser 
            ? <LogIn
                newUser = {this.newUser} 
                hashPassword = {this.hashPassword} 
                isLoggedIn = {this.isLoggedIn}/>
            : <SignUp
                newUser = {this.newUser} 
                hashPassword = {this.hashPassword} 
                isLoggedIn = {this.isLoggedIn}/>
            }
            </form>
          </div>
        }
      </div>
    );
  }
}

export default App;
