import React, { Component } from 'react';
import { Route, Link, NavLink, withRouter } from 'react-router-dom';
import {Nav, Navbar, NavItem, Jumbotron, Button} from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
      <div>
      <Jumbotron>
         <h1>Hello, world!</h1>
         <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
         <p><Button bsStyle="primary">Learn more</Button></p>
       </Jumbotron>      
      <h3>Home</h3>
      </div>
    );
  }
}


class Browse extends Component {
  render() {
    return (
      <h3>Browse</h3>
    );
  }
}


class Login extends Component {
  render() {
    return (
      <h3>Login</h3>
    );
  }
}

class Register extends Component {
  render() {
    return (
      <h3>Register</h3>
    );
  }
}


class App extends Component {

  navigateTo(url) {
    this.props.history.push(url);
  }

  render() {
    return (
      <div className="container fluid">
        <Navbar fluid inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/">Contacts Manager</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={this.navigateTo.bind(this, "/browse")}>Browse</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={this.navigateTo.bind(this, "/login")}>Login</NavItem>
              <NavItem eventKey={1} onClick={this.navigateTo.bind(this, "/register")}>Register</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default withRouter(App);
