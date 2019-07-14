import React from 'react';
// import { compose } from 'recompose';
import './Home.css';
import { Tab, Tabs, Pills, Nav } from 'react-bootstrap'
// import withFirebaseAuth from "react-with-firebase-auth";
// import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";

import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro"

function Home() {
  return (
    <div className='home'>
      <img src={require('../images/logo.png')} />
      <div class="container home-tabs rounded pt-3 pb-3">
        <Tabs fill variant="tabs" variant="pills" >
          <Tab eventKey="home" title="Login">
            <Login />
          </Tab>
          <Tab eventKey="profile" title="Cadastro">
            <Cadastro />
          </Tab>
        </Tabs>
      </div>
    </div>

  );
}

export default Home;
