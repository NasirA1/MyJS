import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { Grid, Row, Col, Nav, Navbar, NavItem , Button, FormGroup, FormControl, Collapse } from 'react-bootstrap';
import AlertDismissable from './AlertDismissable';
import Home from './Home';
import Browse from './Browse';
import Login from './Login';
import Register from './Register';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alert: {
        title: '',
        visibility: false,
        message: '',
        bsStyle: ''
      }
    };
  }

  navigateTo(url) {
    this.props.history.push(url);
  }

  setAlertState(alertState) {
    let state = this.state;
    state.alert = alertState;
    this.setState(state);
  }

  onDismissClick() {
    this.setAlertState({ visibility: false });
  }

  render() {
    return (
      <div className="container-fixed">
        <Navbar inverse collapseOnSelect>
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

        <Grid>
          <Row>
            <Collapse in={this.state.alert.visibility}>
            <div style={{zIndex: '999', position: 'fixed', width: '360px', left: '50%', marginLeft: '-180px'}}>
              <AlertDismissable title={this.state.alert.title} message={this.state.alert.message} 
                bsStyle={this.state.alert.bsStyle} visibility={this.state.alert.visibility}
                onDismissClick={() => this.onDismissClick()}
              />
            </div>
            </Collapse>
          </Row>
          
          <Row>
            <Route path="/" exact component={Home} />
            <Route path="/browse" component={Browse} />
            <Route path="/login" render={ (props) => (
              <Login {...props} setAlert={(state) => this.setAlertState(state)} />
            )} />
            <Route path="/register" render={ (props) => (
              <Register {...props} setAlert={(state) => this.setAlertState(state)} />
            )} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
