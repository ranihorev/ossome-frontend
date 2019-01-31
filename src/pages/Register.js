import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Button, Form} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import {connect} from "react-redux";
import {loginRegisterAction} from "../actions/action_user";
import {isEmpty} from "lodash";
import {withRouter} from "react-router";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  submit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };

  render() {
    const error = this.props.user.error;
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row className="justify-content-center">
            <Col xs="12" md="8" lg="7">
              <h3 className={'text-center'}>Register</h3>
              <Form className="form" onSubmit={this.submit}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input type="text" name="first_name" id="first_name"
                         value={this.state.first_name} onChange={this.handleChange} placeholder="First Name"
                         required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input type="text" name="last_name" id="last_name"
                         value={this.state.last_name} onChange={this.handleChange} placeholder="Last Name"
                         required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="email" id="email"
                         value={this.state.email} onChange={this.handleChange} placeholder="myemail@email.com"
                         required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" name="password" id="password"
                         value={this.state.password} onChange={this.handleChange} placeholder="Enter Password"
                         required
                  />
                </FormGroup>
                <div className={'text-center'}>
                  <div className="login-error">
                    {!isEmpty(error) ? error.data.message : ''}
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
    register: (data) => {
      dispatch(loginRegisterAction(data, 'register'))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Register));