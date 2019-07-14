import React from 'react';
import Navbar from 'react-bootstrap/Navbar'

function NavbarDefault() {
    return (
        <div>
            <Navbar bg="light" variant="light" sticky="top">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={require('../images/logo.png')}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    {' Burger Queen'}
                </Navbar.Brand>
                <Navbar.Text>
                    Logado como: <a href="#login">Jay Ferreira</a>
                </Navbar.Text>
            </Navbar>
        </div>
    );
}

export default NavbarDefault;