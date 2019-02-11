import React, {Component} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import './NewComment.scss';
import {Button, Form} from "reactstrap";
import {connect} from "react-redux";
import {addNewComment, NEW_COMMENT} from "../../actions/action_posts";
import {isEmpty} from "lodash";
import DirectionProvider from "../DirectionProvider";

class NewComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showSubmit: false
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {post, posts: {lastAction}} = this.props;
    const newAction = nextProps.posts.lastAction;
    if (newAction.type === NEW_COMMENT && newAction.post_id === post && newAction.comment_id !== lastAction.comment_id) {
      this.setState({text: '', showSubmit: false});
    }
  }

  submit = (e) => {
    e.preventDefault();
    const content = { ...this.state };
    delete content.showSubmit;
    const comment = {content: this.state, post: this.props.post};
    this.props.addNewComment(comment);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode == 13 && e.metaKey)
      this.submit(e);
  }

  toggleSubmit = (e) => {
    this.setState({showSubmit: !isEmpty(this.state.text) || e.type === 'focus'});
  };

  render() {
    const {text} = this.state;
    return (
      <Form className={'new-comment'} onSubmit={this.submit}>
        <DirectionProvider text={text}>
          <TextareaAutosize
            minRows={1}
            className={'form-control'}
            required={true}
            id="text"
            placeholder={'Write a comment'}
            onChange={this.handleChange}
            onFocus={this.toggleSubmit}
            onBlur={this.toggleSubmit}
            onKeyDown={this.handleKeyDown}
            value={text}
          />
        </DirectionProvider>
        {this.state.showSubmit ?
          <div className={'text-right'}>
            <Button className={'btn-sm ossome-button'} color="primary" type="submit" disabled={isEmpty(this.state.text)}>
              Submit
            </Button>
          </div> : ''
        }
      </Form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewComment: (comment) => {
      dispatch(addNewComment(comment));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NewComment);
