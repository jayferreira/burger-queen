import React, { Component } from 'react';
import { compose } from 'recompose';
import firebase from "../firebaseConfig";
import Button from "../components/Button";
import Input from "../components/Input";
import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
// import database from 'firebase';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            tipo: 'Salão',
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
                const id = resp.user.uid;
                if (resp){
                database.collection("users").doc(id).get()
                    .then(resp => {
                        console.log(resp.data());
                        const data = resp.data();
                        this.props.history.push(`/${data.tipo}`);
                        alert("logou");
                    });
                }
            })
    }
    render() {
        if (this.props.error) {
            alert(this.props.error);
        }
        return (
            <div>
                <Input value={this.state.email} placeholder="digite seu email" onChange={(e) => this.handleChange(e, "email")} ></Input>
                <Input value={this.state.senha} placeholder="digite sua senha" onChange={(e) => this.handleChange(e, "senha")}  ></Input>
                <Button color="primary" text="Entrar" onClick={this.signIn} />                             
            </div >
        )
    }
}


export default compose( withFirebaseAuth({ firebaseAppAuth, }), withRouter,)(Login);