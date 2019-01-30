import React, {Component} from 'react';

class Post extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        {this.props.content.text}
      </div>
    );
  }
}

export default Post;