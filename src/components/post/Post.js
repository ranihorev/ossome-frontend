import React, {Component} from 'react';
import './post.scss';
import {Card} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import get_age from "../timeUtils";
import {isEmpty} from "lodash";
import {deletePost} from "../../actions/action_posts";
import {connect} from "react-redux";
import ImageGallery from "react-image-gallery";
import Rating from "react-rating";

const GOOGLE_LINK = 'https://www.google.com/maps/search/?q=place_id:';
const TMDB_LINK = 'https://www.themoviedb.org';

class Post extends Component {

  redner_location() {
    const {content: {location}} = this.props;
    if (isEmpty(location) || isEmpty(location.text)) return <div></div>
    return <div className="post-location">
      Checked in at - <a href={GOOGLE_LINK + location.id} target="_blank" rel="noopener noreferrer">{location.text}</a>
    </div>
  }

  redner_watching() {
    const {content: {movie}} = this.props;
    if (isEmpty(movie) || isEmpty(movie.title)) return <div></div>
    return <div className="post-watching">
      <div>
        Watching - <a href={`${TMDB_LINK}/${movie.type}/${movie.id}`} target="_blank" rel="noopener noreferrer">{movie.title}</a>
      </div>
      {
        movie.rating !== undefined ?
          <div className="text-center mt-2">
          <Rating
            className="movie-rating"
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
                <a href="#" className="anchor-username media-heading">{content.user.first_name} {content.user.last_name}</a>
                <a href="#" className="anchor-time">{get_age(content.date_published)}</a>
              </div>
              <div>
                  {
                    (content.user._id === user.data.id) ?
                      <a className="post-menu" href="" onClick={(e) => {e.preventDefault(); this.props.deletePost(content._id)}}>
                        <i className="fal fa-trash-alt"></i>
                      </a> :
                      ""
                  }
              </div>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deletePost: (post_id) => {
      dispatch(deletePost(post_id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Post);