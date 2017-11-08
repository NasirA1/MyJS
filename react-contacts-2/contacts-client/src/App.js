import React, { Component } from 'react';
import { Route, Link, NavLink, withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Axios from 'axios';
import { Nav, Navbar, NavItem, Jumbotron, Button, PageHeader, Table } from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
      <div>
      <Jumbotron>
         <h1>Welcome!</h1>
         <p>Contacts Manager is a simple web application for managing contacts.</p>
         <p><Link to="/browse"><Button bsStyle="primary">Browse Records</Button></Link></p>
       </Jumbotron>
     {/*<PageHeader>Home</PageHeader>*/}
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
        sortMethod: (a, b, desc) => parseInt(a) > parseInt(b)? 1: parseInt(a) < parseInt(b)? -1: 0
      },
      {Header: 'First Name', minWidth: 60, accessor: 'firstName'},
      {Header: 'Last Name', minWidth: 60, accessor: 'lastName'},
      {Header: 'Email', minWidth: 60, accessor: 'email'},
      {Header: 'Phone', minWidth: 40, accessor: 'phone'},
      {Header: 'Address', accessor: 'address'}
    ];
    return (
      <div class="content">
        <PageHeader>Browse</PageHeader>
        <ReactTable
          data={this.state.contacts} columns={columns}
          defaultPageSize={5}
          filterable
          loading={this.state.loading}
          onFetchData={(state, instance) => {
            this.setState({loading: true});
            Axios.get('http://localhost:8081/contacts')
              .then(res => {
                this.setState({
                  contacts: res.data.Items,
                  loading: false
                });
              })
              .catch(err => console.error(err));
          }}
        />
      </div>
    );
  }
}


class Login extends Component {
  render() {
    return (
      <PageHeader>Login</PageHeader>
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
      <div className="container fluid">
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
              <NavItem eventKey={1} onClick={this.navigateTo.bind(this, "/login")}>Login</NavItem>
              <NavItem eventKey={1} onClick={this.navigateTo.bind(this, "/register")}>Register</NavItem>
            </Nav>
          </Navbar.Collapse>
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
