import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Panel } from 'react-bootstrap';
import * as Services from '../Api';
import _ from 'lodash';
import * as validator from 'validator';


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async memberExists(email) {
    try {
      const response = await Services.isMember(email);
      if (response.data.exists) {
        console.log(`${email} already exists on the system`);
        return true;
      }
      else {
        console.log(`${email} available for registration!`);
        return false;
      }

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  onEmailChange(event) {
    this.handleInputChange(event);
    if (this.getEmailValidationState() === 'success') {
      event.persist();
      this.delayedCallback(event);
    }
  }

  delayedCallback = _.debounce((event) => {
    this.memberExists(event.target.value);
  }, 1000);

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let user = this.state.user;
    user[name] = value;

    this.setState({
      user: user
    });
  }

  getEmailValidationState() {
    return this.state.user.email.length > 0 ?
      validator.isEmail(this.state.user.email) ?
        'success' : 'error' : null;
  }

  getNameValidationState() {
    const length = this.state.user.firstName.trim().length;
    return length > 0 ?
      length > 1 ?
        'success' : 'warning' : null;
  }

  getPasswordValidationState() {
    const length = this.state.user.password.length;
    return length > 0 ?
      length > 5 ? 'success' :
        length > 3 ?
          'warning' : 'error' : null;
  }

  getConfirmPasswordValidationState() {
    return this.state.user.confirmPassword.length > 0 ?
      this.state.user.confirmPassword === this.state.user.password ?
        'success' : 'error' : null;
  }

  formIsValid() {
    return this.getEmailValidationState() === 'success' &&
      this.getNameValidationState() === 'success' &&
      this.getPasswordValidationState() === 'success' &&
      this.getConfirmPasswordValidationState() === 'success';
  }

  
  async submit(event) {
    event.preventDefault();
    if (!this.formIsValid()) return;

    try {
      const response = await Services.register(this.state.user);
      console.log(response.data);
      this.props.setAlert({ message: response.data.message, bsStyle: 'success', visibility: true} );
    } catch (err) {
      console.error(err);
      console.error(err.response.data.error);
      this.props.setAlert({ message: err.response.data.error, bsStyle: 'danger', visibility: true});
    }
  }


  render() {
    return (
      <Col lg={6} lgOffset={3}>
        <Panel header="Register" bsStyle="primary">
          <Form horizontal onSubmit={this.submit.bind(this)}>
            <FormGroup controlId="formHorizontalEmail" validationState={this.getEmailValidationState()}>
              <Col componentClass={ControlLabel} xs={5}>
                Email
              </Col>
              <Col xs={7}>
                <FormControl name="email" type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalFirstName" validationState={this.getNameValidationState()}>
              <Col componentClass={ControlLabel} xs={5}>
                First Name
              </Col>
              <Col xs={7}>
                <FormControl name="firstName" type="text" placeholder="First Name" onChange={this.handleInputChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLastName">
              <Col componentClass={ControlLabel} xs={5}>
                Last Name
              </Col>
              <Col xs={7}>
                <FormControl name="lastName" type="text" placeholder="Last Name" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
              <Col componentClass={ControlLabel} xs={5}>
                Password
              </Col>
              <Col xs={7}>
                <FormControl name="password" type="password" placeholder="Password" onChange={this.handleInputChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.getConfirmPasswordValidationState()}>
              <Col componentClass={ControlLabel} xs={5}>
                Confirm Password
              </Col>
              <Col xs={7}>
                <FormControl name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.handleInputChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={10} smOffset={2}>
                <Button type="submit" style={{ float: 'right' }} disabled={!this.formIsValid()}>
                  &nbsp;&nbsp;Register&nbsp;&nbsp;
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      </Col>
    );
  }
}


export default Register;