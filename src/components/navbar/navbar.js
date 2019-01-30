import React from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem, NavLink} from 'reactstrap';
import {Link} from "react-router-dom";
import {logoutAction} from "../../actions/action_user";
import {connect} from "react-redux";
import {isEmpty} from "lodash";

class BaseNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ossome</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isEmpty(this.props.user.data) ?
                <NavItem>
                  <NavLink tag={Link} to={"/register"}>Register</NavLink>
                </NavItem>
                 :
                <NavItem>
                  <NavLink tag={Link} to={"/"} onClick={this.props.logout}>Logout</NavLink>
                </NavItem>
              }
              {isEmpty(this.props.user.data) ?
                <NavItem>
                  <NavLink tag={Link} to={"/login"}>Login</NavLink>
                </NavItem> : ''
              }
            </Nav>
          </Collapse>
        </Navbar>
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
    logout: (data) => {
      dispatch(logoutAction(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (BaseNavbar);
