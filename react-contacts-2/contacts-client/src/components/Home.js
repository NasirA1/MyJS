import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Well } from 'react-bootstrap';


class Home extends Component {

  render() {
    return (
      <div>
        <Jumbotron style={{textAlign: 'center'}}>
          <h1>Welcome!</h1>
          <p>Contacts Manager is a simple multi-user web application for managing contacts.  
            Please <em>log in</em> or <em>register</em> to start using the system.
          </p>
          <br />
          <Well bsSize="lg" className="center-block">
            <Link to="/login"><Button bsSize="lg" bsStyle="primary" disabled={this.props.store.getState().userReducer.isLoggedIn}>
              &nbsp;&nbsp;Login&nbsp;&nbsp;
            </Button></Link>{' '}
            <Link to="/register"><Button bsSize="lg" bsStyle="primary">Register</Button></Link>
          </Well>

        </Jumbotron>
      </div>
    );
  }
}

export default Home;