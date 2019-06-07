import React, { Component } from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import database from 'firebase';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            nome: '',
            tipo: 'Salão',
        };
    };

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    createUser = () => {
        this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha)
            .then(resp => {
                if (resp) {
                    const id = resp.user.uid;
                    database.collection("users").doc(id).set({
                        email: this.state.email,
                        nome: this.state.nome,
                        tipo: this.state.tipo
                    })
                        .then(() => {
                            if (this.state.tipo)
                                this.props.history.push(`/${this.state.tipo}`);
                        });
                }
            })
    }

    signIn = () => {
        this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then((resp) => {
                const id = resp.user.uid;
                database.collection("users").doc(id).get()
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
                <input value={this.state.nome} placeholder="digite seu nome" onChange={(e) => this.handleChange(e, "nome")} ></input>
                <input value={this.state.email} placeholder="digite seu email" onChange={(e) => this.handleChange(e, "email")} ></input>
                <input value={this.state.senha} placeholder="digite sua senha" onChange={(e) => this.handleChange(e, "senha")}  ></input>
                <select onChange={(e) => this.handleChange(e, "tipo")}>
                    <option value="Salão">Salão</option>
                    <option value="Cozinha">Cozinha</option>
                </select>
                <Button text="Entrar" onClick={this.signIn} />
                <button>Esqueceu a senha?</button>
                <hr></hr>
                <Button text="Criar Novo User" onClick={this.createUser} />
                <hr></hr>
            </div >
        )
    }
}




export default withFirebaseAuth({ firebaseAppAuth, })(Login);
