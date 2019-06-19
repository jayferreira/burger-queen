import React, { Component } from 'react';
import firebase from "../firebaseConfig";
import Button from 'react-bootstrap/Button';
import withFirebaseAuth from "react-with-firebase-auth";
import Navbar from "../components/Navbar"
import { Container, Row, Col } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const firebaseAppAuth = firebase.auth();

const products = [
    {
        nome: "Café Americano",
        preço: 5
    },
    {
        nome: "Café com Leite",
        preço: 7
    },
    {
        nome: "Sanduíche de Presunto e Queijo",
        preço: 10
    },
    {
        nome: "Suco de Fruta Natural",
        preço: 7
    }
]


class Salao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comprar: [],
            senha: '',
        };
    };

    cliqueDaCompra = (item) => {
        const itemIndex = this.state.comprar.findIndex((produto) => {
            return produto.nome === item.nome;
        })
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            };
            this.setState({
                comprar: this.state.comprar.concat(newItem)
            });
        } else {
            let newComprar = this.state.comprar;
            newComprar[itemIndex].quantity += 1;
            this.setState({
                comprar: newComprar
            });
        }
    }

    clickDelete = (item) => {
        const itemIndex = this.state.comprar.findIndex(produto => {
            return produto.nome === item.nome;
        })

        let newComprar = this.state.comprar;
        newComprar[itemIndex].quantity -= 1;

        const quantity = newComprar[itemIndex].quantity;
        if (quantity > 0) {
            this.setState({
                comprar: newComprar
            });
        } else {
            newComprar.splice(itemIndex, 1);
            this.setState({
                comprar: newComprar
            });
        }
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    render() {
        const totalValue = this.state.comprar.reduce((acc, cur) => {
            return acc + (cur.quantity * cur.preço)
        }, 0);

        return (
            <Container fluid className="p-0">
                <div>
                    <Navbar></Navbar>
                </div>

                <Row>
                    <Col>
                        <h1>Café da Manhã</h1>
                        {
                            products.map((products, i) => {
                                return <Button variant="dark" key={i} onClick={() => { this.cliqueDaCompra(products) }} >{products.nome} </Button>
                            })
                        }

                    </Col>
                    <Col>
                        <h1>Itens Comprados:</h1>
                        {
                            this.state.comprar.map((products, i) => {
                                return <div key={i}>
                                    <p>{products.nome} - {products.preço * products.quantity} -Quantidade:{products.quantity}</p>
                                    <Button variant="warning" onClick={() => this.clickDelete(products)}>Deletar 1</Button>
                                </div>
                            })
                        }
                        {
                            <p>Valor Total: {totalValue}</p>
                        }

                    </Col>

                </Row>


                {
                    <Button variant="dark">Enviar pra Cozinha</Button>
                }
            </Container>
        );
    }
}


export default withFirebaseAuth({ firebaseAppAuth, })(Salao);
