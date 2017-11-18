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
    this.setState({user: user});
    
    if (this.getEmailValidationState() === 'success') {
      event.persist();
      this.delayedCallback(event);
    }
  }

  delayedCallback = _.debounce((event) => {
    let user = this.state.user;    
    
    this.memberExists(event.target.value).then( result => {
      user.unavailable = result;
      console.log(user.unavailable);
      this.setState({user: user});
    })
    .catch(err => {
      user.unavailable = false;
      this.setState({user: user});      
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
    return this.state.user.email.length > 0?
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
      this.props.setAlert({ title: 'Oops!', message: err.response.data.error, bsStyle: 'danger', visibility: true });      
    }
  }

  getHelpText() {
    if(this.state.user.email.trim().length > 0 && 
        this.state.user.unavailable) {
      return (
        <span style={{ position: 'fixed' }} className='help-block small'>User ID already taken!</span>
      );
    }
  return (<span></span>);
  }

  render() {
    return (
      <Col>
        <Panel header="Register" className="centered" bsStyle="primary">
          <Form horizontal onSubmit={this.submit.bind(this)}>
            <FormGroup controlId="formHorizontalEmail" validationState={this.getEmailValidationState()} style={{marginBottom: '25px'}}>
              <Col componentClass={ControlLabel} xs={5} lg={3}>
                Email
              </Col>
              <Col xs={7} lg={9}>
                <FormControl name="email" type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} />
                <FormControl.Feedback />
              </Col>
              <Col xs={7} xsOffset={5} lg={9} lgOffset={3}>              
                { this.getHelpText() }
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalFirstName" validationState={this.getNameValidationState()}>
              <Col componentClass={ControlLabel} xs={5} lg={3}>
                First Name
              </Col>
              <Col xs={7} lg={9}>
                <FormControl name="firstName" type="text" placeholder="First Name" onChange={this.handleInputChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLastName">
              <Col componentClass={ControlLabel} xs={5} lg={3}>
                Last Name
              </Col>
              <Col xs={7} lg={9}>
                <FormControl name="lastName" type="text" placeholder="Last Name" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
              <Col componentClass={ControlLabel} xs={5} lg={3}>
                Password
              </Col>
              <Col xs={7} lg={9}>
                <FormControl name="password" type="password" placeholder="Password" onChange={this.handleInputChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.getConfirmPasswordValidationState()}>
              <Col componentClass={ControlLabel} xs={5} lg={3}>
                Confirm Password
              </Col>
              <Col xs={7} lg={9}>
                <FormControl name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.handleInputChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={10} smOffset={2}>
                <Button type="submit" style={{ float: 'right' }} bsStyle="primary" disabled={!this.formIsValid()}>
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