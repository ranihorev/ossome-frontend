import React, {Component} from 'react';
import './post.scss';
import {Card, Col, Row} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Media from "reactstrap/es/Media";
import get_age from "../timeUtils";
import {isEmpty} from "lodash";

const GOOGLE_LINK = 'https://www.google.com/maps/search/?q=place_id:';

class Post extends Component {

  redner_location() {
    const {content: {location}} = this.props;
    if (isEmpty(location) || isEmpty(location.text)) return <div></div>
    return <div className="post-location">
      Checked in at - <a href={GOOGLE_LINK + location.id} target="_blank">{location.text}</a>
    </div>
  }

  render() {
    const {content} = this.props;
    return (
      <Card className="panel-default post">
        <CardBody>
          <section className="post-heading">
            <Row>
              <Col md="11">
                <Media>
                  <div className="media-left">
                    <a href="#">
                      {/*<img className="media-object photo-profile" src="" width="40" height="40" alt="..."/>*/}
                    </a>
                  </div>
                  <Media body>
                    <a href="#" className="anchor-username media-heading">{content.user.first_name} {content.user.last_name}</a>
                    <a href="#" className="anchor-time">{get_age(content.date_published)}</a>
                  </Media>
                </Media>
              </Col>
              <Col md="1">
                <a href="#"></a>
              </Col>
            </Row>
          </section>
          <section className="post-body">
            {this.redner_location()}
            <div className="post-text">{content.text}</div>
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

export default Post;