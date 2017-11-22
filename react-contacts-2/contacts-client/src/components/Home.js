import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>Contacts Manager is a simple multi-user web application for managing contacts.  
            Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to start using the system.
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;