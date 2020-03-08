import React, { Component } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ContentLoader from "react-content-loader";
import Card from 'react-bootstrap/Card';
import genericPoster from './film-poster-placeholder.png';

export default class Placeholder extends Component {
  render() {
    return (
      <Card className="my-3">
        <ReactCSSTransitionGroup
          transitionName="loadingItem"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <img alt="loading" className="feed__loading-item" src={genericPoster} width="100%" />
        </ReactCSSTransitionGroup>
        <Card.Body>
          <ContentLoader
            width={100+'%'}
            height={60}
            speed={2}
            primary-color="#f3f3f3"
            secondary-color="#7c7c7c"
            style={{ marginBottom: "4px" }}
          >
            <rect x="5%" y="10" rx="10" ry="10" width="90%" height="40" />
          </ContentLoader>
        </Card.Body>
        <Card.Footer>
          <ContentLoader
            width={100+'%'}
            height={40}
            speed={2}
            primary-color="#f3f3f3"
            secondary-color="#7c7c7c"
            style={{ marginBottom: "4px" }}
          >
            <rect x="5%" y="10" rx="10" ry="10" width="90%" height="20" />
          </ContentLoader>
        </Card.Footer>
      </Card>    
    );
  }
}
