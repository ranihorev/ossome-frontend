import React from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import './FilterPosts.scss';
import {Link} from "react-router-dom";
import {activityFields} from "../Fields";

class FilterPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      value: 'Filter posts'
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select = (event) => {
    this.setState({
      dropdownOpen: false,
      value: event.target.innerText
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
          {activityFields.map((f, idx) => <Link to={`/activity/${f.name}`}>
              <DropdownItem onClick={this.select} key={idx}>
                {f.text}
              </DropdownItem>
            </Link>
          )}

        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default FilterPosts;