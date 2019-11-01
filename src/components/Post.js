import React from 'react';

import {Card} from 'react-bootstrap';

export default class Post extends React.Component {
    render() {
        return (
          <div className="post-box">
            <Card className="postbox-card">
              { this.props.title ? <Card.Header>{this.props.title}</Card.Header> : <> </>}
              <Card.Body style={{whiteSpace: "pre-wrap"}}>{this.props.content}</Card.Body>
            </Card>
          </div>
        );
    }
}