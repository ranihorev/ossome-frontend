import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Button, Form} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import {loginAction} from "../actions/action_user";
import {connect} from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  submit = () => {
    var payload = {
      "email": this.state.email,
      "password": this.state.password
    }
    this.props.login(payload);
  };

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
                  <Button color="primary" onClick={this.submit}>Submit</Button>
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

export default connect(mapStateToProps, mapDispatchToProps) (Login);
