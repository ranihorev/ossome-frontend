import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest';
import './BaseField.scss';
import {auth_axios} from "../../../api"
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import PropTypes from 'prop-types';
import {isEmpty} from "lodash";
import Rating from "react-rating";

class BaseField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
    }
  }

  onChange = (event, { newValue, method }) => {
    const { input } = this.props;
    let newValueNorm = newValue;
    if (typeof newValue !== 'object') {
      newValueNorm = {text: newValue, id: '', type: ''}
    };
    newValueNorm.rating = input.value.rating;
    input.onChange(newValueNorm);
  };

  updateRating = (rating) => {
    const { input } = this.props;
    input.onChange({...input.value, rating: rating});
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    };
  }

  onSuggestionsFetchRequested = ({ value, reason }) => {
    if (reason === 'input-changed') {
      var self = this;
      auth_axios.get(this.props.endpointURL, {params: {q: value}})
        .then(res => {
          self.setState({suggestions: res.data});
        })
        .catch(err => console.log(err));
    } else {
      this.setState({suggestions: this.state.suggestions});
    }
  };


  onSuggestionsClearRequested = () => {};

  renderInputComponent = inputProps => (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          {this.props.fieldIcon}
        </InputGroupText>
      </InputGroupAddon>

      <Input autoFocus {...inputProps}/>

    </InputGroup>
  );

  render() {
    const { suggestions } = this.state;
    const { input: {value}, renderSuggestion, renderSuggestionsContainer, wrapperClass, placeholder}  = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: placeholder,
      value: value.text || '',
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    return (
      <div className={`base-field ${wrapperClass}`}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderInputComponent={this.renderInputComponent}
          focusInputOnSuggestionClick={false}
          inputProps={inputProps}
        />
        {!isEmpty(value.text) ?
          <div className="text-center">
            <Rating
              className="field-rating"
              emptySymbol="fas fa-star star-empty"
              fullSymbol="fas fa-star star-full"
              fractions={2}
              onChange={this.updateRating}
              initialRating={value.rating}
            />
          </div> : ''
        }
      </div>
    );
  }
}

BaseField.propTypes = {
  renderSuggestion: PropTypes.func.isRequired,
  renderSuggestionsContainer: PropTypes.func,
  endpointURL: PropTypes.string.isRequired,
  wrapperClass: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  fieldIcon: PropTypes.string.isRequired,
  collapsedText: PropTypes.string.isRequired
}

BaseField.defaultProps = {
  wrapperClass: ''
}

export default BaseField;