import React, { Component } from 'react';
import { Route, Link, NavLink, withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as Services from './Api';
import { Nav, Navbar, NavItem, Jumbotron, Button, PageHeader, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox } from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
      <div>
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


class Browse extends Component {

  constructor(props) {
    super(props);
    this.state = { contacts: [], loading: false };
  }

  render() {
    const columns = [{
        Header: 'ID', accessor: 'id', minWidth: 30, 
        Cell: props => <span style={{float: 'right', marginRight: '1em'}}>{props.value}</span>,
        sortMethod: (a, b, desc) => parseInt(a, 10) > parseInt(b, 10)? 1: parseInt(a, 10) < parseInt(b, 10)? -1: 0
      },
      {Header: 'First Name', minWidth: 60, accessor: 'firstName'},
      {Header: 'Last Name', minWidth: 60, accessor: 'lastName'},
      {Header: 'Email', minWidth: 60, accessor: 'email'},
      {Header: 'Phone', minWidth: 40, accessor: 'phone'},
      {Header: 'Address', accessor: 'address'}
    ];
    return (
      <div className="content">
        <PageHeader>Browse</PageHeader>
        <ReactTable
          data={this.state.contacts} columns={columns}
          defaultPageSize={5}
          filterable
          loading={this.state.loading}
          onFetchData={(state, instance) => {
            this.setState({loading: true});
            Services.getAllContacts()
              .then(res => {
                this.setState({
                  contacts: res.data.Items,
                  loading: false
                });
              })
              .catch(err => {
                //TODO display error alert
                console.error(err);
                this.setState({
                  loading: false
                });                
              });
          }}
        />
      </div>
    );
  }
}


class Login extends Component {
  render() {
    return (
      <div className="container-fluid">
        <PageHeader>Login</PageHeader>
        <div className="center">
        <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
    
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>
    
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>
    
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" style={{float: 'right'}}>
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
    </div>     
    );
  }
}

class Register extends Component {
  render() {
    return (
      <PageHeader>Register</PageHeader>
    );
  }
}


class App extends Component {

  navigateTo(url) {
    this.props.history.push(url);
  }

  render() {
    return (
      <div className="container">
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
              <NavItem eventKey={2} onClick={this.navigateTo.bind(this, "/login")}>Login</NavItem>
              <NavItem eventKey={3} onClick={this.navigateTo.bind(this, "/register")}>Register</NavItem>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl type="text" placeholder="Search" />
                </FormGroup>{' '}
                <Button type="submit">Search</Button>
              </Navbar.Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Navbar fluid inverse style={{marginTop: '2em'}}>
          <Nav>
            <NavItem>© Copyright 2017</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(App);
