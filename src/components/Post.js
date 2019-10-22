import React from 'react';

import {Card} from 'react-bootstrap';

export default class Post extends React.Component {
    render() {
        return (
          <div className="post-box">
            <Card className="postbox-card">
              <Card.Header>{this.props.title}</Card.Header>
              <Card.Body>{this.props.content}</Card.Body>
            </Card>
          </div>
        );
    }
}