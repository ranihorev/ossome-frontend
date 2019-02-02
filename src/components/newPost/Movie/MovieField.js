import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest';
import {auth_axios} from "../../../api";
import './MovieField.scss';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";


export default class MovieField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {title: '', id: ''},
      suggestions: []
    }
  }

  onChange = (event, { newValue, method }) => {
    const { input } = this.props;
    if (typeof newValue === 'object') {
      input.onChange(newValue);
    }
    else {
      input.onChange({title: newValue, id: ''});
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
      auth_axios.get('v1/posts/search_movies/', {params: {q: value}})
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
      <div className="movie-thumb">
        <img src={`https://image.tmdb.org/t/p/w92/${suggestion.img}`}/>
      </div>
      {suggestion.title}
    </div>
  );

  renderInputComponent = inputProps => (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fal fa-film"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input {...inputProps} />
      </InputGroup>
    </div>
  );

  render() {
    const { suggestions } = this.state;
    const { input: {value} }  = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'What are you watch?',
      value: value.title || '',
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    // Finally, render it!
    return (
      <div className="movie-field">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => {return suggestion}}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

