import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, Panel, Grid, Row } from 'react-bootstrap';
import * as Services from '../Api';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      },
      rememberMe: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    if(this.props.store.getState().user.isLoggedIn) {
      this.props.store.dispatch({ type: 'USER_LOGOUT' });
      this.props.navigateTo('/');
    }
  }


  formIsValid() {
    return this.state.user.email.length > 0 && this.state.user.password.length > 0;
  }


  async submit(event) {
    event.preventDefault();
    if (!this.formIsValid()) return;

    try {
      const response = await Services.login(this.state.user);
      console.log(response.data);
      this.props.store.dispatch( { type: 'USER_LOGIN', firstName: response.data.firstName, token: response.data.token } );
      this.props.navigateTo('/browse');
    } catch (err) {
      console.error(err);
      const msg = err.response && err.response.data? err.response.data.error: err.message;
      this.props.setAlert({ title: 'Oops!', message: msg, bsStyle: 'danger', visibility: true });
    }
  }



  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var user = this.state.user;
    user[name] = value;

    this.setState({
      user: user
    });
  }


  render() {
    return (
      <Col lg={4} lgOffset={4}>
      <div className="centered-parent"><div className="centered-child">
        <Panel header="Login" className="" bsStyle="primary">
        <Grid fluid>
          <Row>          
          <Form horizontal onSubmit={this.submit.bind(this)}>
            <div className="input-group" style={{marginBottom: '5px'}}>
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <FormControl type="email" name="email" placeholder="Email" onChange={this.handleInputChange} />
            </div>
            <div className="input-group"  style={{marginBottom: '5px'}}>
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
              <FormControl type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />			
            </div>
            <FormGroup>
              <Col xs={12}>
                <Button type="submit" bsStyle="primary" style={{ float: 'right' }} disabled={!this.formIsValid()}>
                  &nbsp;&nbsp;Sign in&nbsp;&nbsp;
                </Button>
              </Col>
            </FormGroup>
          </Form>
          </Row>
        </Grid>          
        </Panel>
        </div></div>
      </Col>
    );
  }
}


export default Login;