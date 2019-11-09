import React from 'react';
import { CSSTransition } from "react-transition-group";

import {Modal, Button, Card, Form} from 'react-bootstrap'

export default class QuickPostBox extends React.Component {

  state = {
    post: {
      content: "",
      tags: []
    },
    fill: false
  }

    handleSubmit = (event) => {
        event.preventDefault()
        if (!this.state.post.content.match(/\S+/)) {
          console.log("please type something");
        } else if (this.state.post.content.match(/\S+/)) {
          console.log(this.state.post.content);
        } 
    }

    handleChange = async (event) => {
        await this.setState({post: {content: event.target.value}})

        if (this.state.post.content.match(/\S+/)) {
          this.setState({ fill: true });
        } else {
          this.setState({fill: false})
        }
    }

    render() {
      return (
        // <Form onSubmit={e => this.handleSubmit(e)}>
        <section>
          <Card className="create-post-box animated fadeIn">
            <Card.Header>Social</Card.Header>
            <form onSubmit={e => this.handleSubmit(e)}>
              <Card.Body>
                <textarea
                  onChange={event => this.handleChange(event) }
                  className="postbox-textarea"
                  placeholder="What's going on?"
                  contentEditable
                  suppressContentEditableWarning
                  required
                ></textarea>
              </Card.Body>
              <Card.Footer>Tags (Coming Soon)</Card.Footer>
              <Card.Footer>
                <Button 
                disabled={this.state.fill ? false : true} 
                type="submit">Post</Button>
              </Card.Footer>
            </form>
          </Card>
        </section>
        // </Form>
      );
    };
}