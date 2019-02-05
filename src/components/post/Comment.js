import React from 'react';
import './comment.scss';

export default function CommentsList(props) {
  const {comments} = props;
  return (
    <div className="comments-list">
      {comments.map((c, idx) => <Comment key={idx} data={c}/>)}
    </div>
  )
}

function Comment(props) {
  const {data} = props;
  return (
    <div className="comment">
      <span className="comment-user">{data.user.first_name} {data.user.last_name}</span>
      <span className="comment-text">
        {data.text}
      </span>
    </div>
  )
};
