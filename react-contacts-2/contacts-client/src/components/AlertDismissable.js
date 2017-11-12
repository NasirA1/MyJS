import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';


class AlertDismissable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: true
    };

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleAlertShow = this.handleAlertShow.bind(this);
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} style={{marginBottom: '3em'}}>
          <h4>Oops!</h4>
          <p>{this.props.text}</p>
        </Alert>
      );
    }

    return (
      <Button onClick={this.handleAlertShow}>Show Alert</Button>
    );
  }
}

export default AlertDismissable;