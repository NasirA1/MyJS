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
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact: {this.props.contact? this.props.contact.firstName: ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid>
              <Row className>
              <Form horizontal>
              <FormGroup controlId="formHorizontalFirstName" >
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    First Name
                  </Col>                                  
                  <Col lg={9}>
                    <FormControl name="firstName" type="text" placeholder="First Name" value={current? current.firstName: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Last Name
                  </Col>
                  <Col lg={9}>
                    <FormControl name="lastName" type="text" placeholder="Last Name" value={current? current.lastName: ''} onChange={this.handleInputChange} />
                  </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalEmail">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Email
                </Col>
                  <Col lg={9}>
                    <FormControl name="email" type="email" placeholder="Email" value={current? current.email: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPhone">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Phone
                </Col>
                  <Col lg={9}>
                    <FormControl name="phone" type="tel" placeholder="Phone Number" value={current? current.phone: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalAddress">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Address
                  </Col>
                  <Col lg={9}>
                    <FormControl name="address" componentClass="textarea" placeholder="Address" value={current? current.address: ''} onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>
              </Form>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" style={{width: '100px'}} onClick={this.props.onCloseClick}>Cancel</Button>
            <Button bsStyle="success" type="submit" style={{width: '100px'}} onClick={this.props.onCloseClick}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default EditContact;