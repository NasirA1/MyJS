import React, { Component } from 'react';
import * as Services from '../Api';
import { Button, Modal, Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class EditContact extends Component {

  constructor(props) {
    super(props);
    this.state = { contact: null };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onOpen() {
    this.setState({
      contact: Object.assign({}, this.props.contact)
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let contact = this.state.contact;
    contact[name] = value;

    this.setState({
      contact: contact
    });
  }

  render() {
    let current = this.state.contact;

    return (
      <div>
        <Modal
          show={this.props.showModal}
          onEnter={this.onOpen.bind(this)}
          onHide={this.props.onCloseClick}
          keyboard enforceFocus restoreFocus
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact: {this.props.contact? this.props.contact.firstName: ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row>
              <Form horizontal>
              <FormGroup controlId="formHorizontalFirstName" >
                  <Col lg={1} componentClass={ControlLabel}>
                    First Name
                  </Col>                                  
                  <Col lg={5}>
                    <FormControl name="firstName" type="text" placeholder="First Name" value={current? current.firstName: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                  <Col lg={1} componentClass={ControlLabel}>
                    Last Name
                  </Col>
                  <Col lg={5}>
                    <FormControl name="lastName" type="text" placeholder="Last Name" value={current? current.lastName: ''} onChange={this.handleInputChange} />
                  </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalEmail">
                  <Col lg={1} componentClass={ControlLabel}>
                    Email
                </Col>
                  <Col lg={5}>
                    <FormControl name="email" type="email" placeholder="Email" value={current? current.email: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPhone">
                  <Col lg={1} componentClass={ControlLabel}>
                    Phone
                </Col>
                  <Col lg={5}>
                    <FormControl name="phone" type="text" placeholder="Phone Number" value={current? current.phone: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalAddress">
                  <Col lg={1} componentClass={ControlLabel}>
                    Address
                  </Col>
                  <Col lg={5}>
                    <FormControl name="address" componentClass="textarea" placeholder="Address" value={current? current.address: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>
              </Form>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onCloseClick}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default EditContact;