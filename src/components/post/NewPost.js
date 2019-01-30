import React, { Component } from 'react';
import {FormGroup, Input, Button, Form} from "reactstrap";
import {auth_axios} from "../../api";

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
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

        <div className={'text-center'}>

          <Button color="primary">Submit</Button>
        </div>
      </Form>

    );
  }
}

export default NewPost;
