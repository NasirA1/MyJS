import React, { Component } from 'react';
import Clock from './Clock';

import {
  Button, Alert, DropdownButton, ButtonGroup, MenuItem,
  Nav, Navbar, NavItem, NavDropdown, PageHeader
} from 'react-bootstrap';


class AlertDismissable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { alertVisible: true };
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
          <p>Change this and that and try again. Duis mollis, est non commodo luctus...</p>
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
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Contact Manager</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <form className="navbar-form navbar-right">
                <div className="form-group">
                  <input type="text" placeholder="Email" className="form-control"  style={{marginRight: '5px'}} />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Password" className="form-control" style={{marginRight: '5px'}} />
                </div>
                <button type="submit" className="btn btn-success">Sign in</button>
              </form>
            </div>
          </div>
        </nav>

        <div className="jumbotron">
          <div className="container">
            <h1>Welcome</h1>
            <p>You can view the data as much as you like, but if you want to change it, you need to register!</p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
          </div>
        </div>

        <div className="container">

          <div className="row">
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
          </div>

          <hr />
          <footer>
            <p>&copy; 2017 Company, Inc.</p>
          </footer>
        </div>

      </div>
    );
  }
}


export default App;
