import React, { Component } from 'react';
import Clock from './Clock';

import {
  Button, Alert, DropdownButton, ButtonGroup, MenuItem,
  Nav, Navbar, NavItem, NavDropdown
} from 'react-bootstrap';


class AlertDismissable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {alertVisible: true };
  }

  getInitialState() {
    return {
      alertVisible: true,
    };
  }

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
          <h4>Oh snap! You got an error!</h4>
          <p>Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p>
          <p>
            <Button bsStyle="danger">Take this action</Button>
            <span> or </span>
            <Button onClick={this.handleAlertDismiss.bind(this)}>Hide Alert</Button>
          </p>
        </Alert>
      );
    }

    return (
      <Button onClick={this.handleAlertShow.bind(this)}>Show Alert</Button>
    );
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }
};


class App extends Component {

  constructor(props) {
    super(props);
  }


  buttonClick() {
    alert('You clicked me!');
  }


  render() {    
    return (
      <div className="App">
        <Clock /> <br />
        <Button onClick={this.buttonClick}>Click Me</Button> <br /><br />
        <AlertDismissable /> <br /> <br />
        <ButtonGroup>
          <DropdownButton id="dropdown-btn-menu" bsStyle="success" title="Dropdown">
            <MenuItem key="1">Dropdown link</MenuItem>
            <MenuItem key="2">Dropdown link</MenuItem>
          </DropdownButton>
          <Button bsStyle="info">Middle</Button>
          <Button bsStyle="info">Right</Button>
        </ButtonGroup>

        <br /><br />

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Link</NavItem>
              <NavItem eventKey={2} href="#">Link</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Link Right</NavItem>
              <NavItem eventKey={2} href="#">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}


export default App;
