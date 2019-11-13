import React from "react";
import { CSSTransition } from "react-transition-group";
import uuid from "uuid/v4";

import { Modal, Button, Card, Form } from "react-bootstrap";
import Cancel from "./Cancel";

export default class QuickPostBox extends React.Component {
  state = {
    content: "",
    tags: [],
    tmpId: null,
    fill: false,
    maxTags: false,
    invalidTags: false,
    tagChars: 0
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
    if (event.target.value.length > 64) return;
    if (!event.target.value.length) return;

      let tag = event.target.value
        .toLowerCase()
        .trim()
        .replace(/[^\w]/g, "");
      if (!this.state.tags.includes(tag) && this.state.tags.length <= 9) {
        await this.setState(prevState => ({
          tags: [...prevState.tags, tag]
        }));
      }

      if (this.state.tags.length >= 10) {
        this.setState({maxTags: true})
      }
  };

  handleTagClick = async event => {
    const name = event.target.innerText;
    await this.setState(prevState => ({
      tags: prevState.tags.filter(tag => tag !== name)
    }));

    if (this.state.tags.length <=9) {
      this.setState({ maxTags: false });
    }
  };

  handleCloseBtn = () => {
    this.props.toggler()
  }

  render() {
    return (
      <section>
        <Card className="create-post-box">
          <Card.Header className="quickpost-card-header">
            <span className="quickpost-header-text">Social</span>
          </Card.Header>
          <form
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <Card.Body className="quickpost-input-container">
              <textarea
                onChange={event => this.handleChange(event)}
                className="postbox-textarea"
                placeholder="What's going on?"
                contentEditable
                suppressContentEditableWarning
                required
              ></textarea>
              {this.state.tags[0] !== "" && this.state.tags.length > 0 ? (
                <div className="tags-container" style={{wordWrap: "break-word", overflowWrap: "break-word"}}>
                  {this.state.tags.map(tag => (
                    <div key={uuid()} onClick={event => this.handleTagClick(event)} className="tag-span">
                      {tag}
                    </div>
                  ))}
                  <span>{this.state.tags.length}/10</span>
                </div>
              ) : (
                <></>
              )}
            </Card.Body>
            <Card.Footer className="quickpost-tags-container">
              <span style={
                  !this.state.invalidTags
                    ? { display: "none" }
                    : { display: "block", maxWidth: "538px", padding: "10px", gridArea: "warning", borderBottom: "1px solid rgba(215, 218, 251, 0.01)" }}>
                Only (64 total) lowercase alphabets, numbers and underscores are
                valid.
                <div style={{ fontWeight: "bolder" }}>
                  Hit the delete key for wizardry.
                </div>
              </span>
              {!this.state.maxTags ? <span className="quickpost-tag-charcount">
                {this.state.tagChars}/64</span> 
                : <></>
                }
              {!this.state.maxTags ? (
                <input
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      this.handleTags(event);
                      this.setState({ invalidTags: false, tagChars: 0 });
                      event.target.value = "";
                    } else if (event.key === "Delete") {
                      event.preventDefault();
                      this.setState({ invalidTags: false });
                      if (!event.target.value.match(/^\w+$/)) {
                        event.target.value = event.target.value
                          .replace(/[^\w]/g, "")
                          .toLowerCase();
                      }
                      this.setState({ tagChars: event.target.value.length });
                    }
                  }}
                  onChange={event => {
                    this.setState({tagChars: event.target.value.length})
                    if (
                      event.target.value.search(/^\w+$/g) &&
                      event.target.value !== ""
                    ) {
                      this.setState({ invalidTags: true });
                    } else if (event.target.value.length > 64) {
                      this.setState({ invalidTags: true });
                    } else {
                      this.setState({ invalidTags: false });
                    }
                  }}
                  className="quickpost-tags-input"
                  maxLength="64"
                  className="postbox-tags-textarea"
                  placeholder="Tags (eg: science, non_fiction)"
                  contentEditable
                  suppressContentEditableWarning
                ></input>
              ) : (
                <></>
              )}
            </Card.Footer>
            <Card.Footer className="quickpost-box-footer">
              <button
                className="quickpost-cancel-btn"
                onClick={e => this.handleCloseBtn()}
              >
                Cancel
              </button>
              <button
                disabled={this.state.fill ? false : true}
                className="quickpost-post-btn"
                type="submit"
              >
                Post
              </button>
            </Card.Footer>
          </form>
        </Card>
      </section>
    );
  }
}
