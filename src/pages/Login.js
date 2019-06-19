import React, { Component } from 'react';
import { compose } from 'recompose';
import firebase from "../firebaseConfig";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            tipo: '',
        };
    };

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    signIn = () => {
        this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then((resp) => {                 
                    database.collection("users").doc(resp.user.uid).get()
                        .then(resp => {
                            console.log(resp.data());
                            const data = resp.data();
                            this.props.history.push(`/${data.tipo}`);
                            alert("logou");
                        });               
            })
    }
    render() {
        if (this.props.error) {
            alert(this.props.error);
        }
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail1">
                        <Form.Control value={this.state.email} type="email" placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword2">
                        <Form.Control value={this.state.senha} type="password" placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "senha")} />
                    </Form.Group>
                </Form>
                    <Button variant="secondary" type="submit" onClick={this.signIn} >Entrar</Button>
            </div>
        )
    }
}

export default compose(withFirebaseAuth({firebaseAppAuth,}),withRouter)(Login);