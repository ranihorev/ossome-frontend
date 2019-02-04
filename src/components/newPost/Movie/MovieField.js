import React, {Component} from 'react'
import './MovieField.scss';
import '../BaseField/BaseField.scss';
import BaseField from "../BaseField/BaseField";
import {isEmpty} from "lodash";

export default class LocationField extends Component {

  renderSuggestion = suggestion => (
    <div>
      <div className="movie-thumb">
        {(!isEmpty(suggestion.img)) ? <img src={`https://image.tmdb.org/t/p/w92/${suggestion.img}`}/> : ""}
      </div>
      {suggestion.text}
    </div>
  );


  render() {
    return (
      <BaseField
        endpointURL={'v1/posts/search_movies/'}
        wrapperClass={'movie-field'}
        placeholder={'What are you watching?'}
        collapsedText={'Watching'}
        fieldIcon={'fal fa-film'}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        {...this.props}
      />
    );
  }
}


