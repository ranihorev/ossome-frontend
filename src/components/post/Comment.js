import React, {Component} from 'react';
import './comment.scss';

export default function Comment(props) {
  const {data} = props;
  return (
    <div className="comment">
      <div className="comment-user">{data.user.first_name} {data.user.last_name}</div>
      <div className="comment-text">
        {data.text}
      </div>
    </div>
  )
};
