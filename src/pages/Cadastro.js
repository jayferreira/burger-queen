import React, { Component } from 'react';
import { compose } from 'recompose';
import firebase from "../firebaseConfig";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import withFirebaseAuth from "react-with-firebase-auth";

import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import { MenuItem } from '@material-ui/core';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Cadastro extends Component {
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
        console.log(this.state.email);
        this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha)
            .then(resp => {
                if (resp) {
                    const id = resp.user.uid;
                    console.log(id);
                    database.collection("users").doc(id).set({
                        email: this.state.email,
                        nome: this.state.nome,
                        tipo: this.state.tipo
                    })
                        .then(() => {
                            // if (this.state.tipo)
                                this.props.history.push(`/${this.state.tipo}`);
                                alert("Criado com sucesso");
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
                <Input value={this.state.nome} placeholder="Nome" onChange={(e) => this.handleChange(e, "nome")} ></Input>
                <Input value={this.state.email} placeholder="E-mail" onChange={(e) => this.handleChange(e, "email")} ></Input>
                <Select placeholder="selecione o tipo" name="tipo" handleChange={(e) => this.handleChange(e, "tipo")} value={this.state.tipo}>
                   
                </Select>
                <Input value={this.state.senha} placeholder="Senha" onChange={(e) => this.handleChange(e, "senha")}  ></Input>
                <Button text="Criar Novo User" onClick={this.createUser} />
            </div >
        )
    }
}




export default compose( withFirebaseAuth({ firebaseAppAuth, }), withRouter,)(Cadastro);
