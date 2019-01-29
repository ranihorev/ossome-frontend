import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Button, Form} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import {connect} from "react-redux";
import {loginAction} from "../actions/action_user";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      errors: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  submit = () => {

  }

  render() {
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row>
            <Col>
              <h3 className={'text-center'}>Sign In</h3>
              <Form className="form">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input type="text" name="first_name" id="first_name"
                         value={this.state.first_name} onChange={this.handleChange} placeholder="First Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input type="text" name="last_name" id="last_name"
                         value={this.state.last_name} onChange={this.handleChange} placeholder="Last Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="email" id="email"
                         value={this.state.email} onChange={this.handleChange} placeholder="myemail@email.com"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" name="password" id="password"
                         value={this.state.password} onChange={this.handleChange} placeholder="Enter Password"
                  />
                </FormGroup>
                <div className={'text-center'}>
                  <div className="login-error">
                    {this.state.errors}
                  </div>
                  <Button color="primary">Submit</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (data) => {
      dispatch(loginAction(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Register);