import React from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import './FilterPosts.scss';
import {activityFields} from "../Fields";
import {withRouter} from "react-router";
import queryString from 'query-string';

const BASE_VALUE = 'Filter posts';

class FilterPosts extends React.Component {
  constructor(props) {
    super(props);
    const { location: {search}} = this.props;
    const q = queryString.parse(search);
    let defValue = BASE_VALUE;
    if (q.activity !== undefined) {
      defValue = activityFields.find((f) => f.name === q.activity)
      defValue = (defValue && defValue.text) || BASE_VALUE;
    }
    this.state = {
      dropdownOpen: false,
      value: defValue
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select = (text, name) => {
    const { location: {pathname}, location: {search}, history} = this.props;
    let q = queryString.parse(search);
    if (name !== BASE_VALUE)
      q.activity = name;
    else
      delete q.activity;
    history.push({pathname: pathname, search: queryString.stringify(q)});
    this.setState({
      dropdownOpen: false,
      value: text
    });

  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="filter-dropdown">
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
          className="dropdown-text"
        >
          {this.state.value} <i className="fas fa-caret-down"></i>
        </DropdownToggle>
        <DropdownMenu right>
          {
            activityFields.map((f, idx) =>
            <DropdownItem onClick={() => this.select(f.text, f.name)} key={idx}>
              {f.text}
            </DropdownItem>
          )}
          {
            this.state.value !== BASE_VALUE ?
            <DropdownItem onClick={() => this.select(BASE_VALUE, BASE_VALUE)}>Show All</DropdownItem> : ''
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withRouter(FilterPosts);