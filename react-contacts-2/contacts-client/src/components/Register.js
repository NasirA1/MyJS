import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col, Panel, Grid, Row } from 'react-bootstrap';
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
        confirmPassword: '',
        unavailable: false
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
    let user = this.state.user;
    user.unavailable = false;
    this.setState({ user: user });

    if (this.getEmailValidationState() === 'success') {
      event.persist();
      this.delayedCallback(event);
    }
  }

  delayedCallback = _.debounce((event) => {
    let user = this.state.user;

    this.memberExists(event.target.value).then(result => {
      user.unavailable = result;
      console.log(user.unavailable);
      this.setState({ user: user });
    })
      .catch(err => {
        user.unavailable = false;
        this.setState({ user: user });
      });
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
      this.state.user.unavailable === false && validator.isEmail(this.state.user.email) ?
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
      this.props.setAlert({ title: 'Success', message: response.data.message, bsStyle: 'success', visibility: true });
      this.props.navigateTo('/login');
    } catch (err) {
      console.error(err);
      const msg = err.response && err.response.data ? err.response.data.error : err.message;
      this.props.setAlert({ title: 'Oops!', message: msg, bsStyle: 'danger', visibility: true });
    }
  }

  getHelpText() {
    if (this.state.user.email.trim().length > 0 &&
      this.state.user.unavailable) {
      return (
        <span style={{float: 'right', margin: '0'}} className='help-block small'>User ID already taken!</span>
      );
    }
    return null;
  }

  render() {
    return (
      <Col lg={4} lgOffset={4}  className="vertical-center">>
        <Panel header="Register" bsStyle="primary">
          <Grid fluid>
            <Row>
              <Form horizontal onSubmit={this.submit.bind(this)}>
                <FormGroup controlId="formHorizontalEmail" validationState={this.getEmailValidationState()}>
                  <Col lg={12}>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                      <FormControl name="email" type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} />
                      <FormControl.Feedback />
                    </div>
                    {this.getHelpText()}                    
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalFirstName" validationState={this.getNameValidationState()}>
                  <Col lg={12}>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                      <FormControl name="firstName" type="text" placeholder="First Name" onChange={this.handleInputChange} />
                      <FormControl.Feedback />
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                  <Col lg={12}>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                      <FormControl name="lastName" type="text" placeholder="Last Name" onChange={this.handleInputChange} />
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
                  <Col lg={12}>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                      <FormControl name="password" type="password" placeholder="Password" onChange={this.handleInputChange} />
                      <FormControl.Feedback />
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.getConfirmPasswordValidationState()}>
                  <Col lg={12}>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                      <FormControl name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.handleInputChange} />
                      <FormControl.Feedback />
                    </div>
                  </Col>

                </FormGroup>

                <FormGroup>
                  <Col lg={10} lgOffset={2}>
                    <Button type="submit" style={{ float: 'right' }} bsStyle="primary" disabled={!this.formIsValid()}>
                      &nbsp;&nbsp;Register&nbsp;&nbsp;
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Row>
          </Grid>
        </Panel>
      </Col>
    );
  }
}


export default Register;