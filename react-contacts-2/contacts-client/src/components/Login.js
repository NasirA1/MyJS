import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Panel } from 'react-bootstrap';
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


  formIsValid() {
    return this.state.user.email.length > 0 && this.state.user.password.length > 0;
  }


  async submit(event) {
    event.preventDefault();
    if (!this.formIsValid()) return;

    try {
      const response = await Services.login(this.state.user);
      console.log(response.data);
      this.props.setAlert({ message: response.data.message, bsStyle: 'success', visibility: true });
    } catch (err) {
      console.error(err);
      this.props.setAlert({ message: err.response.data.error, bsStyle: 'danger', visibility: true });
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
      <Col lg={6} lgOffset={3}>
        <div style={{ marginTop: '25%', position: 'relative' }} />
        <Panel header="Login" bsStyle="primary">
          <Form horizontal onSubmit={this.submit.bind(this)}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} xs={3}>
                Email
              </Col>
              <Col xs={9}>
                <FormControl type="email" name="email" placeholder="Email" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} xs={3} >
                Password
            </Col>
              <Col xs={9}>
                <FormControl type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xs={12}>
                <Checkbox name="rememberMe" onChange={this.handleInputChange}>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xs={12}>
                <Button type="submit" style={{ float: 'right' }} disabled={!this.formIsValid()}>
                  &nbsp;&nbsp;Sign in&nbsp;&nbsp;
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      </Col>
    );
  }
}


export default Login;