import React, { Component } from 'react';
import firebase from "../firebaseConfig";
import Button from 'react-bootstrap/Button';
// import '../components'
import withFirebaseAuth from "react-with-firebase-auth";
import Navbar from "../components/Navbar"
import { Container, Row, Col } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const firebaseAppAuth = firebase.auth();

const products = {

    breakfast: [
        {
            name: "CAFÉ AMERICANO",
            price: 5,
            type: "manhã"
        },
        {
            name: "CAFÉ COM LEITE",
            price: 7,
            type: "manhã"
        },
        {
            name: "SANDUÍCHE DE PRESUNTO E QUEIJO",
            price: 10,
            type: "manhã"
        },
        {
            name: "SUCO DE FRUTA NATURAL",
            price: 7,
            type: "manhã"
        }
    ],
    day: [

        {
            name: "HAMBÚRGUER SIMPLES",
            price: 10,
            type: "dia"
        },
        {
            name: "HAMBÚRGUER DUPLO",
            price: 15,
            type: "dia"
        },
        {
            name: "BATATA FRITA",
            price: 5,
            type: "dia"
        },
        {
            name: "ANÉIS DE CEBOLA",
            price: 5,
            type: "dia"
        },
        {
            name: "ÁGUA 500ml",
            price: 5,
            type: "dia"
        },
        {
            name: "ÁGUA 750ml",
            price: 7,
            type: "dia"
        },
        {
            name: "BEBIDA GASEIFICADA 500ml	",
            price: 7,
            type: "dia"
        },
        {
            name: "BEBIDA GASEIFICADA 750ml",
            price: 10,
            type: "dia"
        }
    ]
}

class Salao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newOrder: [],
            customer: ''
        };
    };

    cliqueDaCompra = (item) => {
        const itemIndex = this.state.newOrder.findIndex((product) => {
            return product.name === item.name;
        })
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            };
            this.setState({
                newOrder: this.state.newOrder.concat(newItem)
            });
        } else {
            let newComprar = this.state.newOrder;
            newComprar[itemIndex].quantity += 1;
            this.setState({
                newOrder: newComprar
            });
        }
    }

    clickDelete = (item, quantity) => {
        const itemIndex = this.state.newOrder.findIndex(product => {
            return product.name === item.name;
        })

        let newComprar = this.state.newOrder;
        let quantityToDelete = 0;
        
        if (quantity === 1){
            quantityToDelete = 1;
        } else {
            quantityToDelete = newComprar[itemIndex].quantity;
        }
        newComprar[itemIndex].quantity -= quantityToDelete;

        const newQuantity = newComprar[itemIndex].quantity;
        if (newQuantity > 0) {
            this.setState({
                newOrder: newComprar
            });
        } else {
            newComprar.splice(itemIndex, 1);
            this.setState({
                newOrder: newComprar
            });
        }
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    render() {
        const totalValue = this.state.newOrder.reduce((acc, cur) => {
            return acc + (cur.quantity * cur.price)
        }, 0);

        return (
            <Container fluid className="p-0">
                <div>
                    <Navbar></Navbar>
                    <input type="text"></input>
                </div>

                <Row>
                    <Col>
                        <h3>Café da Manhã:</h3>
                        {products.breakfast.map((products, i) => {
                            return <Button variant="dark" key={i} onClick={() => { this.cliqueDaCompra(products) }} >{products.name} - R$: {products.price} </Button>
                        })
                        }
                        <h3>Menu da Casa: </h3>
                        {products.day.map((products, i) => {
                            return <Button variant="dark" key={i} onClick={() => { this.cliqueDaCompra(products) }} >{products.name} - R$: {products.price} </Button>
                        })}
                        
                    </Col>
                    <Col>
                        <h3>Itens Comprados:</h3>
                        {
                            this.state.newOrder.map((products, i) => {
                                return <div key={i}>
                                    <h5>{products.name} - R$ {products.price * products.quantity} - Quantidade: {products.quantity}</h5>
                                    <Button variant="warning" onClick={() => this.clickDelete(products, 1)}>Deletar 1</Button>
                                    <Button variant="warning" onClick={() => this.clickDelete(products, "all")}>Deletar Todos</Button>
                                </div>
                            })
                        }
                        {
                            <p>Valor Total: {totalValue}</p>
                        }
                        {
                            <Button variant="dark">Enviar pra Cozinha</Button>
                        }
                    </Col>

                </Row>


            </Container>
        );
    }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Salao);
