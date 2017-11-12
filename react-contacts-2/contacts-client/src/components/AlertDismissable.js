import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';


class AlertDismissable extends Component {
  constructor(props) {
    super(props);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss() {
     this.props.onDismissClick();
  }

  render() {
    if (this.props.visibility) {
      return (
        <div>
          <Alert bsStyle={this.props.bsStyle} onDismiss={this.handleAlertDismiss}>
            <h4>{this.props.title}</h4>
            <p>{this.props.message}</p>
          </Alert>
        </div>
      );
    }
    else {
      return(<div></div>);
    }
  }
}

export default AlertDismissable;