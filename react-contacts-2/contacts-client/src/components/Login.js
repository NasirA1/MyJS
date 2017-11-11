import React, { Component } from 'react';
import { Button, PageHeader, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox } from 'react-bootstrap';
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
    this.onClick = this.onClick.bind(this);
  }

  async onClick(event) {
    try {
      const response = await Services.login(this.state.user);
      console.log(response.data);
    } catch(err) {
      console.error(err);
    }

    event.preventDefault();
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
      <div className="container-fluid" style={{ marginTop: '2em' }}>
        <PageHeader>Login</PageHeader>
        <div className="center">
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
            </Col>
              <Col sm={10}>
                <FormControl type="email" name="email" placeholder="Email" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
            </Col>
              <Col sm={10}>
                <FormControl type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox name="rememberMe" onChange={this.handleInputChange}>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="button" style={{ float: 'right' }} onClick={this.onClick}>
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


export default Login;