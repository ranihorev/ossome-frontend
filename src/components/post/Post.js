import React, {Component} from 'react';
import './post.scss';
import {Card} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import get_age from "../timeUtils";
import {isEmpty} from "lodash";
import {connect} from "react-redux";
import ImageGallery from "react-image-gallery";
import Rating from "react-rating";
import DeletePost from "./DeletePost";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const GOOGLE_LINK = 'https://www.google.com/maps/search/?q=place_id:';
const TMDB_LINK = 'https://www.themoviedb.org';

function PostField(props) {
  const {data} = props
  if (isEmpty(data) || isEmpty(data.text)) return <div></div>
  return <div className="">
    {props.children}
    {
      data.rating !== undefined ?
        <div className="text-center mt-2">
          <Rating
            className="field-rating"
            emptySymbol="fas fa-star star-empty"
            fullSymbol="fas fa-star star-full"
            fractions={2}
            readonly={true}
            initialRating={data.rating}
          /></div> : ''
    }
  </div>
}

PostField.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

class Post extends Component {

  redner_location() {
    const {content: {location}} = this.props;
    return <PostField data={location} className='post-location'>
      <div>
        Checked in at - {
        !isEmpty(location.id) ?
          <a href={GOOGLE_LINK + location.id} target="_blank" rel="noopener noreferrer">{location.text}</a>
          : location.text
      }
      </div>
    </PostField>
  }

  redner_watching() {
    const {content: {movie}} = this.props;
    return <PostField data={movie} className='post-watching'>
      <div>
        Watching - { !isEmpty(movie.id) ?
        <a href={`${TMDB_LINK}/${movie.type}/${movie.id}`} target="_blank" rel="noopener noreferrer">{movie.text}</a>
        : movie.title
      }
      </div>
    </PostField>
  }

  render() {
    const {content, user} = this.props;
    const images_data = content.images.map((im) => {return {original: im}});
    let images = <span/>;
    if (!isEmpty(images_data)) {
      images = <ImageGallery items={images_data} showPlayButton={false} showThumbnails={false} showFullscreenButton={false}/>;
    }
    return (
      <Card className="panel-default post">
        <CardBody>
          <section className="post-heading d-flex justify-content-between">
              <div>
                <Link to={`/user/${content.user._id}`} className="anchor-username media-heading">
                  {content.user.first_name} {content.user.last_name}
                </Link>
                <a href="#" className="anchor-time">{get_age(content.date_published)}</a>
              </div>
              {
                (content.user._id === user.data.id) ?
                  <DeletePost post={content._id}/> : ""
              }
          </section>
          <section className="post-body">
            {this.redner_location()}
            {this.redner_watching()}
            <div className="post-text">{content.text}</div>
            {images}
          </section>
          <section className="post-footer">
            <hr/>
              <div className="post-footer-option">
                <ul className="list-unstyled">
                  <li><a href="#"><i className="fal fa-thumbs-up"></i> Like</a></li>
                  <li><a href="#"><i className="fal fa-comment"></i> Comment</a></li>
                </ul>
              </div>
          </section>
        </CardBody>
      </Card>

    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null) (Post);