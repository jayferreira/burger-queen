import React, { Component } from 'react';
import './App.css';
import Salao from "./pages/Salao"
import Cozinha from "./pages/Cozinha"
import Home from "./components/Home"
// import 'typeface-roboto';
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";


function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/salao" component={Salao} />
          <Route path="/cozinha" component={Cozinha} />
        </Switch>
      </BrowserRouter>
    </div>


  );
}



export default App;
