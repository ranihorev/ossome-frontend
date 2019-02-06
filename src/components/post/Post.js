import React, {Component} from 'react';
import './post.scss';
import {Card} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import get_age from "../timeUtils";
import {isEmpty} from "lodash";
import {connect} from "react-redux";
import ImageGallery from "react-image-gallery";
import DeletePost from "./DeletePost";
import {Link} from "react-router-dom";
import NewComment from "../newComment/NewComment";
import CommentsList from "./Comment";
import DirectionProvider from "../DirectionProvider";
import PostField from "../Fields/BaseField/BaseRender";


class Post extends Component {

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
            <PostField data={content.location} activity="Checked in at"/>
            <PostField data={content.movie} activity="Watching"/>
            <PostField data={content.music} activity="Listening to"/>
            <PostField data={content.food} activity="Eating at"/>
            <DirectionProvider text={content.text}>
              <div className="post-text">{content.text}</div>
            </DirectionProvider>
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