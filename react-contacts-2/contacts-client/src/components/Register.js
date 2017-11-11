import React, { Component } from 'react';
import { Button, PageHeader, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import * as Services from '../Api';
import _ from 'lodash';


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
    event.persist();
    this.delayedCallback(event);
  }

  delayedCallback = _.debounce( (event) => {
    this.memberExists(event.target.value);
  }, 1000);

  
  async onRegister() {
    try {
      const response = await Services.register(this.state.user);
      console.log(response.data);
    } catch(err) {
      console.error(err);
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
      <div className="container-fluid" style={{ marginTop: '2em' }}>
        <PageHeader>Register</PageHeader>
        <div className="center">
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Email
          </Col>
              <Col sm={8}>
                <FormControl name="email" type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalFirstName">
              <Col componentClass={ControlLabel} sm={4}>
                First Name
          </Col>
              <Col sm={8}>
                <FormControl name="firstName" type="text" placeholder="First Name" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLastName">
              <Col componentClass={ControlLabel} sm={4}>
                Last Name
          </Col>
              <Col sm={8}>
                <FormControl name="lastName" type="text" placeholder="Last Name" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>


            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Password
          </Col>
              <Col sm={8}>
                <FormControl name="password" type="password" placeholder="Password" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalConfirmPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Confirm Password
          </Col>
              <Col sm={8}>
                <FormControl name="confirmPassword" type="password" placeholder="Enter password again" onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="button" style={{ float: 'right' }} onClick={this.onRegister.bind(this)}>
                  &nbsp;&nbsp;Register&nbsp;&nbsp;
              </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}


export default Register;