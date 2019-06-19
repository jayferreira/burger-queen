import React, { Component } from 'react';
import { compose } from 'recompose';
import firebase from "../firebaseConfig";
import Button from 'react-bootstrap/Button';
import { Form, FormControl, FormGroup } from 'react-bootstrap'
import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            nome: '',
            tipo: 'Escolha uma opção',
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
            database.collection("users").doc(resp.user.uid).set({
                email: this.state.email,
                nome: this.state.nome,
                tipo: this.state.tipo
            })
            return this.props.history.push(`/${this.state.tipo}`);
        })
      }

    render() {
        console.log(this.state)
        if (this.props.error) {
            alert(this.props.error);
        }
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Control value={this.state.nome} placeholder="Digite seu Nome" onChange={(e) => this.handleChange(e, "nome")} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control value={this.state.email} type="email" placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control value={this.state.senha} type="password" placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "senha")} />
                    </Form.Group>
                    <FormGroup>
                        <FormControl as="select" value={this.state.tipo} onChange={(e) => this.handleChange(e, "tipo")}>
                            <option>Escolha uma opção</option>
                            <option>salao</option>
                            <option>Cozinha</option>
                        </FormControl>
                    </FormGroup>
                </Form>
                    <Button variant="secondary" type="submit" onClick={this.createUser}>Criar novo user</Button>
            </div >
        )
    }
}

export default compose(withFirebaseAuth({firebaseAppAuth,}),withRouter)(Cadastro);
