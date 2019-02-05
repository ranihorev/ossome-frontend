import React, {Component} from 'react'
import './MovieField.scss';
import '../BaseField/BaseField.scss';
import BaseField from "../BaseField/BaseField";
import {isEmpty} from "lodash";

export default class MovieField extends Component {

  renderSuggestion = suggestion => (
    <div>
      <table>
        <tbody>
        <tr>
          <td className="thumb">
            {(!isEmpty(suggestion.img)) ? <img src={suggestion.img} alt="Movie thumb"/> : ""}
          </td>
          <td className="align-middle">{suggestion.text}</td>
        </tr>
        </tbody>
      </table>
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


