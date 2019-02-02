import React, { Component } from 'react';
import {FormGroup, Button, Form} from "reactstrap";
import LocationField from "./Location/LocationField";
import {Field, reduxForm, startSubmit} from "redux-form";
import './newPost.scss';
import {connect} from "react-redux";
import {addNewPost} from "../../actions/action_posts";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "./ImageUpload/ImageUpload";
import MovieField from "./Movie/MovieField";
import Loader from './loading.gif';

export const FORM_NAME = 'newPost';

const TextWrapper = ({input, id, className, required, placeholder}) => {
  return <TextareaAutosize minRows={3} id={id} className={className} required={required} placeholder={placeholder} {...input}/>;
};
class NewPostForm extends Component {
  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <Form className="new-post-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Field component={TextWrapper} name="text" id="text" className="form-control"
                 placeholder="Write something"
          />
        </FormGroup>
        <Field name="location" component={LocationField}/>
        <Field component={MovieField} name="movie"/>
        <Field component={ImageUpload} name="images" is_submitting={submitting}/>
        <div className={'text-center'}>
          <Button color="primary" type="submit" disabled={pristine || submitting}>Submit</Button>
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
    movie: {title: '', id: '', type: ''},
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

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewPost: (post) => {
      dispatch(startSubmit(FORM_NAME));
      dispatch(addNewPost(post));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NewPost);
