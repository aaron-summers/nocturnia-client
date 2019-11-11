import React from 'react';

import uuid from 'uuid/v4';

import {Card} from 'react-bootstrap';

export default class Post extends React.Component {
    render() {
        return (
          <div className="post-box">
            <Card className="postbox-card">
              { this.props.title ? <Card.Header>{this.props.title}</Card.Header> : <> </>}
              <Card.Body style={{whiteSpace: "pre-wrap"}}>{this.props.content}</Card.Body>
              { this.props.tags.length > 0
                ? <Card.Footer>
                  {this.props.tags.map(tag => <span key={uuid()} className="postbox-footer-tags">#{tag}</span>)}
                </Card.Footer> 
                : <> </>}
            </Card>
          </div>
        );
    }
}