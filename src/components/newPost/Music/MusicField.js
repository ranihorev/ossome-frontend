import React, {Component} from 'react'
import './MusicField.scss';
import '../BaseField/BaseField.scss';
import BaseField from "../BaseField/BaseField";
import {isEmpty} from "lodash";

export default class LocationField extends Component {

  renderSuggestion = suggestion => (
    <div>
      <table>
        <tbody>
        <tr>
          <td className="thumb">
            {(!isEmpty(suggestion.img)) ? <img src={suggestion.img} alt="Music thumb"/> : ""}
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
        endpointURL={'v1/posts/search_music/'}
        wrapperClass={'music-field'}
        placeholder={'What are you listening to?'}
        collapsedText={'Listening'}
        fieldIcon={'🎧'}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        {...this.props}
      />
    );
  }
}


