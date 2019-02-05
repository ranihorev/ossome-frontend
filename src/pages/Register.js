import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Input, Button, Form} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import {connect} from "react-redux";
import {loginRegisterAction} from "../actions/action_user";
import {isEmpty} from "lodash";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

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
            <Col xs="12" md="6" lg="5">
              <h3 className="auth-title">Join Ossome</h3>
              <div class="slogan">
                Open-Source Social Network<br/>
                Share movies, music, restaurants & more with your friends
              </div>
              <Form className="form" onSubmit={this.submit}>
                <FormGroup>
                  <Input type="text" name="first_name" id="first_name"
                         value={this.state.first_name} onChange={this.handleChange} placeholder="First Name"
                         required
                  />
                </FormGroup>
                <FormGroup>
                  <Input type="text" name="last_name" id="last_name"
                         value={this.state.last_name} onChange={this.handleChange} placeholder="Last Name"
                         required
                  />
                </FormGroup>
                <FormGroup>
                  <Input type="email" name="email" id="email"
                         value={this.state.email} onChange={this.handleChange} placeholder="Email"
                         required
                  />
                </FormGroup>

                <FormGroup>
                  <Input type="password" name="password" id="password"
                         value={this.state.password} onChange={this.handleChange} placeholder="Password"
                         required
                  />
                </FormGroup>
                <div className={'text-center'}>
                  {!isEmpty(error) ?
                    <div className="login-error">
                      error.data.message
                    </div> : ''
                  }
                  <Button color="primary" className="ossome-button">Sign up</Button>
                </div>
                <div className="already">
                  Already registered? <Link to={'/login'}>Sign in</Link>
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