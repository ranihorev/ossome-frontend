import React, { Component } from 'react';
import {FormGroup, Button, Form} from "reactstrap";
import {auth_axios} from "../../api";
import LocationField from "./Location/LocationField";
import {Field, reduxForm, reset} from "redux-form";
import './newPost.scss';
import {connect} from "react-redux";
import {addNewPost} from "../../actions/action_posts";
import TextareaAutosize from "react-textarea-autosize";


const NewPostForm = props => {
  const {handleSubmit, pristine, submitting} = props;
  return (
    <Form className="new-post-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Field component={TextareaAutosize} minRows={3} type="textarea" name="text" id="text" className="form-control"
               placeholder="Write something" required
        />
      </FormGroup>
      <Field name="location" component={LocationField}/>
      <div className={'text-center'}>

        <Button color="primary" type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </Form>
  )
};

const afterSubmit = (result, dispatch) => {
  dispatch(reset('newPost'));
};


const NewPostFormRedux = reduxForm({
  form: 'newPost',
  initialValues: {
    location: {text: '', id: ''}
  },
  onSubmitSuccess: afterSubmit
})(NewPostForm);


class NewPost extends Component {

  submit = (values) => {
    auth_axios.post(`/v1/posts/`, {post_type: 'post', content: values}).then(res => {
      this.props.addNewPost(res.data.post);
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    return (
      <NewPostFormRedux onSubmit={this.submit}/>

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
      dispatch(addNewPost(post));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NewPost);
