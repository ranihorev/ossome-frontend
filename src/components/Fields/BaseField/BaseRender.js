import React from 'react';
import '../../post/post.scss'
import {isEmpty} from "lodash";
import Rating from "react-rating";
import PropTypes from "prop-types";

function FieldThumb(props) {
  const {img} = props;
  if (isEmpty(img)) return '';
  return (
    <div className="activity-image">
      <img src={img} alt="Activity thumb"/>
    </div>
  )
}

function FieldRating(props) {
  const {rating} = props;
  if (rating === undefined || rating === 0) return '';
  return (
    <div className="text-center mt-2">
      <Rating
        className="field-rating"
        emptySymbol="fas fa-star star-empty"
        fullSymbol="fas fa-star star-full"
        fractions={2}
        readonly={true}
        initialRating={rating}
      />
    </div>
  )
}

function FieldText(props) {
  const {activity, text, url} = props;
  return (
    <div className={'text-center'}>
      {activity} - { !isEmpty(url) ?
      <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
      : text
    }
    </div>
  )
}

FieldText.propTypes = {
  text: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
}

export default function PostField(props) {
  const {data, activity} = props;
  if (isEmpty(data) || isEmpty(data.text)) return <div></div>;
  return (
    <div className={props.className}>
      <FieldThumb img={data.img}/>
      <FieldText text={data.text} activity={activity} url={data.url}/>
      <FieldRating rating={data.rating}/>
      {props.children}
    </div>
  )
};

PostField.propTypes = {
  data: PropTypes.object,
  activity: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.element,
}

PostField.defaultProps = {
  className: 'post-activity'
}

