import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem , Button, FormGroup, FormControl } from 'react-bootstrap';
import Home from './Home';
import Browse from './Browse';
import Login from './Login';
import Register from './Register';



class App extends Component {

  navigateTo(url) {
    this.props.history.push(url);
  }

  render() {
    return (
      <div className="container">
        <Navbar inverse fixedTop collapseOnSelect>
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
              <NavItem eventKey={2} onClick={this.navigateTo.bind(this, "/login")}>Login</NavItem>
              <NavItem eventKey={3} onClick={this.navigateTo.bind(this, "/register")}>Register</NavItem>
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>{' '}
              <Button type="submit">Search</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Navbar inverse fixedBottom collapseOnSelect style={{marginTop: '2em'}}>
          <Nav>
            <NavItem>© Copyright 2017</NavItem>
          </Nav>
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
