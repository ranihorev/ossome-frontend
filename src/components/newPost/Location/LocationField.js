import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest';
import './LocationField.scss';
import '../BaseField.scss';
import {auth_axios} from "../../../api"
import googleAttr from './powered_by_google.png';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

export default class LocationField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {text: '', id: ''},
      suggestions: [],
      expanded: false
    }
  }

  onChange = (event, { newValue, method }) => {
    const { input } = this.props;
    if (typeof newValue === 'object') {
      input.onChange(newValue);
    }
    else {
      input.onChange({text: newValue, id: ''});
    }
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
      auth_axios.get('v1/posts/autocomplete_places/', {params: {location: value}})
        .then(res => {
          self.setState({suggestions: res.data});
        })
        .catch(err => console.log(err));
    } else {
      this.setState({suggestions: this.state.suggestions});
    }
  };

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
          <img src={googleAttr} alt={'Powered by Google'}/>
        </div>
      </div>
    );
  };

  toggleExpanded = () => {
    this.setState({expanded: !this.state.expanded});
  };

  renderInputComponent = inputProps => (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="fal fa-map-marker-alt"></i>
        </InputGroupText>
        {
          !this.state.expanded ?
            <InputGroupText className="activity-title-collapsed" onClick={this.toggleExpanded}>
              Location
            </InputGroupText> : ''
        }
      </InputGroupAddon>
      {
        this.state.expanded ? <Input autoFocus {...inputProps}/> : ''
      }
    </InputGroup>
  );

  render() {
    const { suggestions } = this.state;
    const { input: {value} }  = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Where are you?',
      value: value.text || '',
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    const {expanded} = this.state;

    return (
      <div className={`base-field location-field ${!expanded ? 'collapsed' : ''}`}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => {return suggestion}}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

