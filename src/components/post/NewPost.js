import React, { Component } from 'react';
import {FormGroup, Input, Button, Form} from "reactstrap";
import {auth_axios} from "../../api";
import LocationField from "./Location/LocationField";

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      location: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  submit = (e) => {
    e.preventDefault();
    auth_axios.post(`/v1/posts/`, {post_type: 'post', content: {text: this.state.text}}).then(res => {
      console.log('Success');
    }).catch(err => {
      console.log(err);
    })
  };

  // autocomplete_location = (event) => {
  //   event.target.value
  // }

  render() {
    return (
      <Form className="form" onSubmit={this.submit}>
        <FormGroup>
          <Input type="textarea" name="text" id="text"
                 onChange={this.handleChange} placeholder="Write something"
                 value={this.state.text}
                 required
          />
        </FormGroup>
       <LocationField/>
        <div>
          <i className="fal fa-map-marker-alt"></i>
        </div>
        <div className={'text-center'}>

          <Button color="primary">Submit</Button>
        </div>
      </Form>

    );
  }
}

export default NewPost;
