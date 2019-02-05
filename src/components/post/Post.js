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
import NewComment from "../newComment/NewComment";
import Comment from './Comment';

const GOOGLE_LINK = 'https://www.google.com/maps/search/?q=place_id:';
const TMDB_LINK = 'https://www.themoviedb.org';

function PostField(props) {
  const {data} = props
  if (isEmpty(data) || isEmpty(data.text)) return <div></div>
  return <div className={props.className}>
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

function CommentsList(props) {
  const {comments} = props;
  return (
    <div>
      {comments.map((c, idx) => <Comment key={idx} data={c}/>)}
    </div>
  )
}

class Post extends Component {

  redner_location() {
    const {content: {location}} = this.props;
    if (isEmpty(location)) return <div></div>;
    return <PostField data={location} className='post-activity'>
      <div>
        Checked in at - {
        !isEmpty(location.id) ?
          <a href={GOOGLE_LINK + location.id} target="_blank" rel="noopener noreferrer">{location.text}</a>
          : location.text
      }
      </div>
    </PostField>
  }

  render_watching() {
    const {content: {movie}} = this.props;
    if (isEmpty(movie)) return <div></div>;
    return <PostField data={movie} className='post-activity'>
      <div>
        { !isEmpty(movie.img) ?
          <div className="activity-image">
            <img src={movie.img}/>
          </div> : ''
        }
        <div className={'text-center'}>
          Watching - { !isEmpty(movie.id) ?
          <a href={`${TMDB_LINK}/${movie.type}/${movie.id}`} target="_blank" rel="noopener noreferrer">{movie.text}</a>
          : movie.text
        }
        </div>
      </div>
    </PostField>
  }

  render_listening() {
    const {content: {music}} = this.props;
    if (isEmpty(music)) return <div></div>;
    return <PostField data={music} className='post-activity'>
      <div>
        { !isEmpty(music.img) ?
          <div className="activity-image">
            <img src={music.img}/>
          </div> : ''
        }
        <div className={'text-center'}>
          Listening to - { !isEmpty(music.id) ?
          <a href={music.url} target="_blank" rel="noopener noreferrer">{music.text}</a>
          : music.text
        }
        </div>
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
            {this.render_watching()}
            {this.render_listening()}
            <div className="post-text">{content.text}</div>
            {images}
          </section>
          <section className="post-footer">
            <hr/>
              <div className="post-footer-option">
                <CommentsList comments={content.comments}/>
                <NewComment post={content._id}/>
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