import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Button, Form} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import {loginRegisterAction} from "../actions/action_user";
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import './auth.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  submit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const error = this.props.user.error;
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row>
            <Col>
              <h3 className={'text-center'}>Sign In</h3>
              <Form className="form" onSubmit={this.submit}>
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
    login: (data) => {
      dispatch(loginRegisterAction(data, 'login'))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);
