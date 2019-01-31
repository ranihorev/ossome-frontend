import React, { Component } from 'react';
import {FormGroup, Button, Form} from "reactstrap";
import {auth_axios} from "../../api";
import LocationField from "./Location/LocationField";
import {Field, reduxForm} from "redux-form";
import './newPost.scss';

const NewPostForm = props => {
  const {handleSubmit, pristine, submitting} = props;
  return (
    <Form className="new-post-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Field component="textarea" type="textarea" name="text" id="text" className="form-control"
               placeholder="Write something" required
        />
      </FormGroup>
      <Field name="location" component={LocationField}/>
      <div className={'text-center'}>

        <Button color="primary" type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </Form>
  )
}


const NewPostFormRedux = reduxForm({
  form: 'newPost',
  initialValues: {
    location: {text: '', id: ''}
  }
})(NewPostForm);


export default class NewPost extends Component {

  submit = (values) => {
    auth_axios.post(`/v1/posts/`, {post_type: 'post', content: values}).then(res => {
      console.log('Success');
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

