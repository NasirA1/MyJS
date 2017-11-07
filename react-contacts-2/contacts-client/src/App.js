import React, { Component } from 'react';
import { Route, Link, NavLink, withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Nav, Navbar, NavItem, Jumbotron, Button, PageHeader,
         Table } from 'react-bootstrap';


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
  render() {
    const columns = [
      {Header: 'ID', accessor: 'id', Cell: props => <span className='number'>{props.value}</span>},
      {Header: 'First Name', accessor: 'firstName'},
      {Header: 'Last Name', accessor: 'lastName'},
      {Header: 'Email', accessor: 'email'},
      {Header: 'Phone', accessor: 'phone'},
      {Header: 'Address', accessor: 'address'}
    ];
    const data = [
      {
        id: '13',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        phone: '07945342233',
        address: '23 Main Road'
      },
      {
        id: '2',
        firstName: 'Alice',
        lastName: 'Wonderland',
        email: 'alice.wonder@gmail.com',
        phone: '',
        address: '55 Maiden Avenue'
      },
      {
        id: '6',
        firstName: 'Martin',
        lastName: 'Chol',
        email: 'mrchol@yahoo.com',
        phone: '0231223221',
        address: '34 Balmoral Road'
      },
      {
        id: '4',
        firstName: 'Sumbyla3l',
        lastName: 'Sotey',
        email: 'sotey343@msn.com',
        phone: '3222322322',
        address: '23 Main Road'
      },
      {
        id: '34',
        firstName: 'Mulla',
        lastName: 'Nasruddin',
        email: 'mullakhana@gmail.af',
        phone: '1111111111',
        address: 'Karte Charrr'
      },
      {
        id: '12',
        firstName: 'Andrew',
        lastName: 'Cole',
        email: 'coleandrewww@mail.com',
        phone: '55334343343',
        address: 'Shshshshshsss'
      }
    ];
    return (
      <div class="content">
        <PageHeader>Browse</PageHeader>
        <ReactTable
          data={data} columns={columns}
          defaultPageSize={5}
          filterable={true}
          onFetchData={() => null}
          responsive
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
