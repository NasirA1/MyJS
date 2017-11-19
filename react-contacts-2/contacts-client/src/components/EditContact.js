import React, { Component } from 'react';
import { Button, Modal, Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class EditContact extends Component {  

  render() {
    if(!this.props.contact)
      return (<div></div>);

    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.onCancelClick}
          keyboard enforceFocus restoreFocus 
          backdrop="static"
          animation 
          autoFocus
        >
        <Form horizontal onSubmit={this.props.onOKClick}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.contact.firstName + ' ' + this.props.contact.lastName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid>
              <Row className>
              <FormGroup controlId="formHorizontalFirstName" >
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    First Name
                  </Col>                                  
                  <Col lg={9}>
                    <FormControl name="firstName" type="text" placeholder="First Name" value={this.props.contact.firstName}  onChange={this.props.onInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Last Name
                  </Col>
                  <Col lg={9}>
                    <FormControl name="lastName" type="text" placeholder="Last Name" value={this.props.contact.lastName}  onChange={this.props.onInputChange} />
                  </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalEmail">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Email
                </Col>
                  <Col lg={9}>
                    <FormControl name="email" type="email" placeholder="Email" value={this.props.contact.email} onChange={this.props.onInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPhone">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Phone
                </Col>
                  <Col lg={9}>
                    <FormControl name="phone" type="tel" placeholder="Phone Number" value={this.props.contact.phone} onChange={this.props.onInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalAddress">
                  <Col lg={3} componentClass={ControlLabel} style={{textAlign: 'left'}} >
                    Address
                  </Col>
                  <Col lg={9}>
                    <FormControl name="address" componentClass="textarea" placeholder="Address" value={this.props.contact.address} onChange={this.props.onInputChange} />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" style={{width: '100px'}} onClick={this.props.onCancelClick}>Cancel</Button>
            <Button bsStyle="success" type="submit" style={{width: '100px'}}>OK</Button>
          </Modal.Footer>
          </Form>          
        </Modal>
      </div>
    );
  }

}

export default EditContact;