import React, { Component } from 'react';
import {Button, Form} from "reactstrap";
import LocationField from "./Location/LocationField";
import {Field, reduxForm, startSubmit} from "redux-form";
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

class NewPostForm extends Component {
  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <Form className="new-post-form" onSubmit={handleSubmit}>
        <Field component={LocationField} name="location"/>
        <Field component={MovieField} name="movie"/>
        <Field component={MusicField} name="music"/>
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
    location: {text: '', id: ''},
    movie: {text: '', id: '', type: ''},
    music: {text: '', id: '', type: ''},
    images: []
  }
})(NewPostForm);


class NewPost extends Component {
  render() {
    return (
      <NewPostFormRedux onSubmit={this.props.addNewPost}/>
    );
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewPost: (post) => {
      dispatch(startSubmit(FORM_NAME));
      dispatch(addNewPost(post));
    },
  }
}

export default connect(null, mapDispatchToProps) (NewPost);
