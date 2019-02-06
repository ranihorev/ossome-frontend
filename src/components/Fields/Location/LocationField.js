import React, {Component} from 'react'
import './LocationField.scss';
import googleAttr from './powered_by_google.png';
import '../BaseField/BaseField.scss';
import BaseField from "../BaseField/BaseField";

export default class LocationField extends Component {

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


  render() {
    return (
      <BaseField
        endpointURL={'v1/posts/autocomplete_places/'}
        wrapperClass={'location-field'}
        placeholder={'Where are you?'}
        fieldIcon={'🗺️'}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        {...this.props}
      />
    );
  }
}

