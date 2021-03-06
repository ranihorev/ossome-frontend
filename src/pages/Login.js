import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Input, Button, Form} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import {loginRegisterAction} from "../actions/action_user";
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import './auth.scss';
import {Link} from "react-router-dom";

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
          <Row className="justify-content-center">
            <Col xs="12" md="6" lg="5">
              <h3 className="auth-title">Sign In</h3>
              <div class="slogan">
                Open-Source Social Network<br/>
                Share movies, music, restaurants & more with your friends
              </div>
              <Form className="form" onSubmit={this.submit}>
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
                  <Button color="primary" className="ossome-button">Log in</Button>
                </div>
              </Form>
              <div className="already">
                Not a member yet? <Link to={'/register'}>Join Now</Link>
              </div>
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
