import React, {Component} from 'react'
import './FoodField.scss';
import googleAttr from './powered_by_google.png';
import '../BaseField/BaseField.scss';
import BaseField from "../BaseField/BaseField";

export default class FoodField extends Component {

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
        endpointURL={'v1/posts/autocomplete_places/?establishment=1'}
        wrapperClass={'food-field'}
        placeholder={'Where are you eating?'}
        fieldIcon={'🍽️️'}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        {...this.props}
      />
    );
  }
}

