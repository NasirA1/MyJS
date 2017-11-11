import React, { Component } from 'react';
import { Button, PageHeader, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox } from 'react-bootstrap';



class Login extends Component {
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
                <Button type="button" style={{ float: 'right' }}>
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