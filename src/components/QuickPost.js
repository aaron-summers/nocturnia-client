import React from "react";
import { CSSTransition } from "react-transition-group";
import uuid from "uuid/v4";

import { Modal, Button, Card, Form } from "react-bootstrap";

export default class QuickPostBox extends React.Component {
  state = {
    content: "",
    tags: [],
    tmpId: null,
    fill: false
  };

  handleSubmit = async event => {
    const { submit } = this.props;
    event.preventDefault();
    if (!this.state.content.match(/\S+/)) return;

    if (this.state.content.match(/\S+/)) {
      try {
        const filteredTags = this.state.tags.filter(tag => tag !== "");
        const post = {
          content: this.state.content,
          tags: filteredTags
        };

        submit(post);
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleChange = async event => {
    await this.setState({ content: event.target.value });

    if (this.state.content.match(/\S+/)) {
      this.setState({ fill: true });
    } else {
      this.setState({ fill: false });
    }
  };

  handleTags = async event => {
    let tag = event.target.value
      .toLowerCase()
      .trim()
      .replace(/[^\w]/g, "");
    if (!this.state.tags.includes(tag)) {
      await this.setState(prevState => ({
        tags: [...prevState.tags, tag]
      }));
    }
  };

  handleTagClick = async event => {
    const name = event.target.innerText;
    await this.setState(prevState => ({
      tags: prevState.tags.filter(tag => tag !== name)
    }));
  };

  render() {
    return (
      <section>
        <Card className="create-post-box animated fadeIn">
          <Card.Header>Social</Card.Header>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Card.Body className="quickpost-input-container">
              <textarea
                onChange={event => this.handleChange(event)}
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    // event.preventDefault();
                    return false;
                  }
                }}
                className="postbox-textarea"
                placeholder="What's going on?"
                contentEditable
                suppressContentEditableWarning
                required
              ></textarea>
              {this.state.tags[0] !== "" && this.state.tags.length > 0 ? (
                <div className="tags-container">
                  {this.state.tags.map(tag => (
                    <div
                      key={uuid()}
                      onClick={event => this.handleTagClick(event)}
                      className="tag-span"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </Card.Body>
            <Card.Footer className="quickpost-tags-container">
              <input
                onKeyDown={event => {
                  if (
                    event.key === "Enter" ||
                    event.key === "," ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    this.handleTags(event);
                    event.target.value = "";
                  }
                }}
                className="postbox-tags-textarea"
                placeholder="Tags: science, non-fiction, etc..."
                contentEditable
                suppressContentEditableWarning
              ></input>
            </Card.Footer>
            <Card.Footer>
              <Button disabled={this.state.fill ? false : true} type="submit">
                Post
              </Button>
            </Card.Footer>
          </form>
        </Card>
      </section>
    );
  }
}
