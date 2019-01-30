import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest';
import './LocationField.scss';
import {auth_axios} from "../../../api"
import googleAttr from './powered_by_google.png';

export default class LocationField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {text: '', id: ''},
      suggestions: []
    }
  }

  onChange = (event, { newValue }) => {
    if (typeof newValue === 'object') {
      this.setState({value: newValue});
    }
    else {
      this.setState({value: {text: newValue, id: ''}});
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value, reason }) => {
    if (reason === 'input-changed') {
      var self = this;
      auth_axios.get('v1/posts/autocomplete_places/', {params: {location: value}})
        .then(res => {
          self.setState({suggestions: res.data});
        })
        .catch(err => console.log(err));
    } else {
      this.setState({suggestions: this.state.suggestions});
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
  };

  renderSuggestion = suggestion => (
    <div>
      {suggestion.text}
    </div>
  );

  renderSuggestionsContainer = ({containerProps , children, query}) => {
    return (
      <div {... containerProps}>
        {children}
        <div className={'google-attr'}>
          <img src={googleAttr}/>
        </div>
      </div>
    );
  }

  render() {
    const { value: {text}, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Where are you?',
      value: text,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => {return suggestion}}
        renderSuggestion={this.renderSuggestion}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        inputProps={inputProps}
      />
    );
  }
}