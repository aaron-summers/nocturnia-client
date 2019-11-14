import React from "react";

import uuid from "uuid/v4";

import { Card } from "react-bootstrap";

export default class Post extends React.Component {
  state = {
    expandedView: false
  };

  handleView = (event) => {
    this.setState({expandedView: !this.state.expandedView})
  }

  render() {
    return (
      <div className="post-box">
        <Card className="postbox-card">
          {this.props.title ? (
            <Card.Header>{this.props.title}</Card.Header>
          ) : (
            <> </>
          )}
          <div
            className="post-content-container"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {this.props.content}
          </div>
          {this.props.media ? (
            <div className="post-image-container">
              <img className="post-img" src={this.props.media} style={
                !this.state.expandedView ?
                {maxHeight: '512px'}
                : {maxHeight: '100%'}
              } 
              onClick={event => this.handleView(event)}/>
            </div>
          ) : (
            <> </>
          )}
          {this.props.tags.length > 0 ? (
            <div className="post-tags-container">
              {this.props.tags.map(tag => (
                <span key={uuid()} className="postbox-footer-tags">
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <> </>
          )}
          <div className="post-engagement-container">likes and stuff</div>
        </Card>
      </div>
    );
  }
}
