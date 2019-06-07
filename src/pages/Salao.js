import React, { Component } from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const firebaseAppAuth = firebase.auth();

class Salao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
        };
    };

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

   
    render() {
        return (
            <div>
                <h1>Eu sou o salão</h1>
            </div>
        )
    }
}



export default withFirebaseAuth({ firebaseAppAuth, })(Salao);
