import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

// Bootstrap Components
import { Container, Row, Nav, Navbar } from "react-bootstrap";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

// image
import Logo from "./assets/DeCash.svg";
import MoneyMemo from "./Components/MoneyMemo";
import Transactions from "./Components/Transactions";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={Logo}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'></Nav>

            <Nav.Link
              onClick={window.walletConnection.isSignedIn() ? logout : login}
            >
              {window.walletConnection.isSignedIn()
                ? window.accountId
                : "Login"}
            </Nav.Link>
            <Nav.Link href='/transactions'>Transactions</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row
          className='d-flex justify-content-center'
          style={{ marginTop: "10px" }}
        >
          <Switch>
            <Route exact path='/'>
              <MoneyMemo />
            </Route>
            <Route exact path='/transactions'>
              <Transactions />
            </Route>
          </Switch>
        </Row>
      </Container>
    </Router>
  );
}