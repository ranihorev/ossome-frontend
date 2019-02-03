import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {DELETE_POST, deletePost} from "../../actions/action_posts";
import {connect} from "react-redux";

class DeletePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {lastAction} = nextProps.posts;
    if (this.state.modal && lastAction.type === DELETE_POST && lastAction.post === this.props.post) {
      this.setState({modal: false});
    }
  }

  toggle = (e) => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  };

  delete = () => {
    this.props.deletePost(this.props.post);
  };

  render() {
    return (
      <div>
        <a className="post-menu" href="" onClick={this.toggle}>
          <i className="fal fa-trash-alt"></i>
        </a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true}>
          <ModalHeader toggle={this.toggle}>Are you sure?</ModalHeader>
          <ModalBody className="text-center">
            <Button color="primary" onClick={this.toggle}>No, keep it</Button>{' '}
            <Button color="danger" onClick={this.delete}>Yes, delete</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deletePost: (post_id) => {
      dispatch(deletePost(post_id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DeletePost);