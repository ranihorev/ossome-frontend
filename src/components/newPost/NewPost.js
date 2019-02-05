import React, { Component } from 'react';
import {Button, Form} from "reactstrap";
import LocationField from "./Location/LocationField";
import {Field, reduxForm, startSubmit, change} from "redux-form";
import './newPost.scss';
import {connect} from "react-redux";
import {addNewPost} from "../../actions/action_posts";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "./ImageUpload/ImageUpload";
import MovieField from "./Movie/MovieField";
import Loader from './loading.gif';
import MusicField from "./Music/MusicField";
import DirectionProvider from "../DirectionProvider";


export const FORM_NAME = 'NEW_POST';

const TextWrapper = ({input, id, className, required, placeholder}) => {
  return (
    <DirectionProvider text={input.value}>
      <TextareaAutosize minRows={3} id={id} className={className} required={required} placeholder={placeholder} {...input}/>
    </DirectionProvider>
  )
};

const fields = [
  {text: '🎥 Watching', component: MovieField, name: 'movie'},
  {text: '🗺️ Location', component: LocationField, name: 'location'},
  {text: '🎧 Listening', component: MusicField, name: 'music'},
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
    const {handleSubmit, pristine, submitting} = this.props;
    const {active} = this.state;
    return (
      <Form className="new-post-form" onSubmit={handleSubmit}>
        <div className="field-buttons">
          {fields.map((f, idx) => <Button outline key={idx} onClick={() => this.toggleField(f.name)}>{f.text}</Button>)}
        </div>
        {fields.map((f, idx) => active[f.name] ? <Field component={f.component} name={f.name} key={idx}/> : '')}
        <Field component={TextWrapper} name="text" id="text" className="form-control text-field" placeholder="Write something"/>
        <Field component={ImageUpload} name="images" is_submitting={submitting}/>
        <div className={'text-center'}>
          <Button color="primary ossome-button" type="submit" disabled={pristine || submitting}>Submit</Button>
        </div>
        { submitting ?
          <div className={'text-center'}>
            <img src={Loader} alt="loading" height="20px"/>
          </div> :
          ""
        }
      </Form>
    )
  }
}


const NewPostFormRedux = reduxForm({
  form: FORM_NAME,
  initialValues: {
    images: []
  }
})(NewPostForm);


class NewPost extends Component {
  render() {
    return (
      <NewPostFormRedux onSubmit={this.props.addNewPost} clearInput={this.props.clearInput}/>
    );
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewPost: (post) => {
      dispatch(startSubmit(FORM_NAME)).catch(err => console.log(err));
      dispatch(addNewPost(post));
    },

    clearInput: (field) => {
      dispatch(change(FORM_NAME, field, ''));
    }
  }
}

export default connect(null, mapDispatchToProps) (NewPost);
