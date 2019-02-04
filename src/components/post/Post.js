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

const GOOGLE_LINK = 'https://www.google.com/maps/search/?q=place_id:';
const TMDB_LINK = 'https://www.themoviedb.org';

class Post extends Component {

  redner_location() {
    const {content: {location}} = this.props;
    if (isEmpty(location) || isEmpty(location.text)) return <div></div>
    return <div className="post-location">
      <div>
        Checked in at - {
        !isEmpty(location.id) ?
          <a href={GOOGLE_LINK + location.id} target="_blank" rel="noopener noreferrer">{location.text}</a>
          : location.text
      }
      </div>
      {
        location.rating !== undefined ?
          <div className="text-center mt-2">
            <Rating
              className="field-rating"
              emptySymbol="fas fa-star star-empty"
              fullSymbol="fas fa-star star-full"
              fractions={2}
              readonly={true}
              initialRating={location.rating}
            /></div> : ''
      }
    </div>
  }

  redner_watching() {
    const {content: {movie}} = this.props;
    if (isEmpty(movie) || isEmpty(movie.text)) return <div></div>
    return <div className="post-watching">
      <div>
        Watching - { !isEmpty(movie.id) ?
        <a href={`${TMDB_LINK}/${movie.type}/${movie.id}`} target="_blank" rel="noopener noreferrer">{movie.text}</a>
        : movie.title
      }
      </div>
      {
        movie.rating !== undefined ?
          <div className="text-center mt-2">
          <Rating
            className="field-rating"
            emptySymbol="fas fa-star star-empty"
            fullSymbol="fas fa-star star-full"
            fractions={2}
            readonly={true}
            initialRating={movie.rating}
          /></div> : ''
      }
    </div>
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