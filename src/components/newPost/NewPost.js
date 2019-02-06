import React, { Component } from 'react';
import {Button, Form} from "reactstrap";
import LocationField from "../Fields/Location/LocationField";
import {Field, reduxForm, startSubmit, change, getFormSubmitErrors} from "redux-form";
import './newPost.scss';
import {connect} from "react-redux";
import {addNewPost} from "../../actions/action_posts";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "../Fields/ImageUpload/ImageUpload";
import MovieField from "../Fields/Movie/MovieField";
import Loader from './loading.gif';
import MusicField from "../Fields/Music/MusicField";
import DirectionProvider from "../DirectionProvider";
import {isEmpty} from "lodash";
import FoodField from "../Fields/Food/FoodField";


export const FORM_NAME = 'NEW_POST';

const TextWrapper = ({input, id, className, required, placeholder}) => {
  return (
    <DirectionProvider text={input.value}>
      <TextareaAutosize minRows={3} id={id} className={className} required={required} placeholder={placeholder} {...input}/>
    </DirectionProvider>
  )
};

const fields = [
  {text: '🎥', component: MovieField, name: 'movie'},
  {text: '🗺️', component: LocationField, name: 'location'},
  {text: '🎧', component: MusicField, name: 'music'},
  {text: '🍽️', component: FoodField, name: 'food'},
  {text: '📷️', component: ImageUpload, name: 'images'},
];

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    let initActive = {};
    fields.forEach((a) => initActive[a.name] = false);
    this.state = { active: initActive};
  }

  toggleField = (f) => {
    const {active} = this.state;
    this.setState({active: {...active, [f]: !active[f]}});
    if (active[f]) {
      this.props.clearInput(f);
    }
  }

  render() {
    const {handleSubmit, pristine, submitting, addNewPost, submitErrors} = this.props;
    const {active} = this.state;
    return (
      <Form className="new-post-form" onSubmit={handleSubmit(addNewPost)}>
        <div className="field-buttons">
          {fields.map((f, idx) => <Button outline key={idx} onClick={() => this.toggleField(f.name)}>{f.text}</Button>)}
        </div>
        {
          fields.map((f, idx) =>
            active[f.name] ? <Field component={f.component} name={f.name} key={idx} is_submitting={submitting}/> : '')
        }
        <Field component={TextWrapper} name="text" id="text" className="form-control text-field" placeholder="Write something"/>
        {
          !pristine ? (<div className={'text-center'}>
            <Button color="primary ossome-button" type="submit" disabled={pristine || submitting}>Submit</Button>
          </div>) : ''
        }

        { submitting ?
          <div className={'text-center'}>
            <img src={Loader} alt="loading" height="20px"/>
          </div> :
          ""
        }
        {
          !isEmpty(submitErrors) ?
            <div className="errors">{submitErrors.message}</div> :
            ""
        }
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearInput: (field) => {
      dispatch(change(FORM_NAME, field, ''));
    },
    addNewPost: (post) => {
      dispatch(startSubmit(FORM_NAME));
      return dispatch(addNewPost(post));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    submitErrors: getFormSubmitErrors(FORM_NAME)(state)
  }
}

const NewPost = connect(mapStateToProps, mapDispatchToProps) (NewPostForm);

export default reduxForm({
  form: FORM_NAME,
  initialValues: {
    images: []
  }
})(NewPost);
