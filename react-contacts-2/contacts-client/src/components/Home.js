import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>Contacts Manager is a simple web application for managing contacts.  You can <Link to="/browse">browse</Link> our records for as long
             as you want, but if you wish to extend or modify the data, you will need to <Link to="/login">login</Link> or <Link to="/register">register</Link>.
           </p>
          <p><Link to="/browse"><Button bsStyle="primary">Browse Records</Button></Link></p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;