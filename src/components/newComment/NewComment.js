import React, {Component} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import './NewComment.scss';
import {Button, Form} from "reactstrap";
import {connect} from "react-redux";
import {addNewComment} from "../../actions/action_posts";

class NewComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  submit = (e) => {
    e.preventDefault();
    const comment = {content: this.state, post: this.props.post};
    console.log(comment);
    this.props.addNewComment(comment);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <Form className={'new-comment'} onSubmit={this.submit}>
        <TextareaAutosize
          minRows={1} className={'form-control'} required={true} id="text"
          placeholder={'Write a comment'} onChange={this.handleChange}
        />
        <div className={'text-right'}>
          <Button className={'btn-sm ossome-button'} color="primary" type="submit">Submit</Button>
        </div>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewComment: (comment) => {
      dispatch(addNewComment(comment));
    },
  }
}

export default connect(null, mapDispatchToProps) (NewComment);
