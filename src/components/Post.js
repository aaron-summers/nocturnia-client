import React from 'react';

export default class Post extends React.Component {
    render() {
        return (
            <div>
            <h3>{this.props.title}</h3>
            <div>{this.props.content}</div>
            </div>
        )
    }
}