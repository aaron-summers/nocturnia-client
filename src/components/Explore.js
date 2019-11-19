import React from 'react';

import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import TokenError from './error/token';
import Tag from './Tag';

class Explore extends React.Component {
    state = {
        tagone: "animals",
        tagtwo: "science"
    }

    handleClick = () => {
        this.props.history.push("/")
    }

    // handleTagsRoute = (id) => {
    //     // return (<Redirect to={`${this.props.match.url}/tags`}/>)
    //     this.props.history.push(`${this.props.match.url}/t/${id}`)
    // }

    handleTags = (id) => {
        this.props.history.push(`${this.props.match.url}/t/${id}`)
        return id
    }

    render() {
        const {location, history, match} = this.props
        return (
          <div>
            <h1>EXPLORE</h1>
            <h1>Tags</h1>
            <ul>
              <li onClick={() => this.handleTags(this.state.tagone)}>
                {this.state.tagtwo}
              </li>
              <li>{this.state.tagone}</li>
            </ul>
            <button onClick={() => this.handleClick(this.props)}>Back</button>
            {/* <button onClick={() => this.handleTags()}>Tags</button> */}
            {/* <Route path={`${this.props.match.url}/user`}><TokenError /></Route> */}

            {/* <Switch> */}
              <Route path={`${match.url}/t/:id`} render={(props) => <Tag tag={this.handleTags} {...props} />} />

            {/* </Switch> */}
          </div>
        );
    }
}

export default withRouter(Explore)