import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { Grid, Row, Nav, Navbar, NavItem , Button, FormControl, Collapse } from 'react-bootstrap';
import AlertDismissable from './AlertDismissable';
import Home from './Home';
import Browse from './Browse';
import Login from './Login';
import Register from './Register';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alert: {
        title: '',
        visibility: false,
        message: '',
        bsStyle: ''
      }
    };
  }

  navigateTo(url) {
    this.props.history.push(url);
  }

  setAlertState(alertState) {
    //quick hack for session expiry handling
    if(alertState.message === 'Failed to authenticate token' ||
       alertState.message === 'No token provided') {
      alertState.message = 'Session expired. Please log in!';
      this.props.store.dispatch({ type: 'USER_LOGOUT' });      
      this.navigateTo('login');
    }
  
    this.setState( { alert: alertState });
    
    //auto-hide after 5 seconds
    if(alertState.visibility) {
      setTimeout( () => {
        this.setState( { alert: { visibility: false } } );
      }, 5000);
    }
  }

  onDismissClick() {
    this.setAlertState({ visibility: false });
  }

  getUserLink() {
    if(this.props.store.getState().userReducer.isLoggedIn) {
      return (
        <Navbar.Link href="#">{this.props.store.getState().userReducer.firstName}</Navbar.Link>
      );
    }
    return null;
  }
  
  render() {
    const userSession = this.props.store.getState().userReducer;

    return (
      <div className="container-fixed">
        <Navbar inverse collapseOnSelect style={{zIndex: '998'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/">Contacts Manager</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={this.navigateTo.bind(this, "/browse")} disabled={!userSession.isLoggedIn}>Browse</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={2} onClick={this.navigateTo.bind(this, "/login")}>{ userSession.isLoggedIn? 'Logout': 'Login' }</NavItem>
              <NavItem eventKey={3} onClick={this.navigateTo.bind(this, "/register")}>Register</NavItem>
            </Nav>
            <Navbar.Text pullRight>
              {userSession.isLoggedIn? 'Logged in as: ': ''}
              { this.getUserLink() }
            </Navbar.Text>            
            <Navbar.Form pullRight>
              <div className="input-group">
                <FormControl type="text" bsSize="small" placeholder="Search" />
                <span className="input-group-btn">
                <Button bsSize="small" type="submit" bsStyle="success">
                  <span className="glyphicon glyphicon-search"></span>
                </Button>
                </span>
              </div>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        {/* footer */}
        <div>
        <Navbar inverse fixedBottom>
          <Nav>
            <NavItem>© Copyright 2017</NavItem>
          </Nav>
        </Navbar>
        </div>

        <Grid>
          <Row>
            <Collapse in={this.state.alert.visibility}>
            <div style={{zIndex: '999', position: 'fixed', width: '360px', left: '50%', marginLeft: '-180px'}}>
              <AlertDismissable title={this.state.alert.title} message={this.state.alert.message} 
                bsStyle={this.state.alert.bsStyle} visibility={this.state.alert.visibility}
                onDismissClick={() => this.onDismissClick()}
              />
            </div>
            </Collapse>
          </Row>
          
          <Row>
            <Route path="/" exact render={ (props) => (
              <Home {...props} 
                store={this.props.store}
              />
            )} />
            <Route path="/browse" render={ (props) => (
              <Browse {...props} 
                setAlert={(state) => this.setAlertState(state)}
                store={this.props.store}
                navigateTo={(url) => this.navigateTo(url)}
              />
            )} />
            <Route path="/login" render={ (props) => (
              <Login {...props} 
                setAlert={(state) => this.setAlertState(state)}
                store={this.props.store}
                navigateTo={(url) => this.navigateTo(url)}
              />
            )} />
            <Route path="/register" render={ (props) => (
              <Register {...props} 
                setAlert={(state) => this.setAlertState(state)}
                navigateTo={(url) => this.navigateTo(url)}
              />
            )} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
