import React from 'react';

import {Card} from 'react-bootstrap';
import adapter from '../api/auth/adapter';
import Loading from './Loading'

export default class UserCard extends React.PureComponent{
    state = {
        self: null
    }

    async componentDidMount() {
        await adapter.getSelf(localStorage.x_tn).then(data => this.setState({
            self: 
            {
                id: data._id, 
                avatar: data.avatar, 
                display: data.displayName, 
                username: data.username
            }
        }))
    }

    render() {
        return (
          <div className="panel">
            {this.state.self ?
                <Card className="user-card">
                    <Card.Img variant="left" src={this.state.self.avatar} height="148px"/>
                <Card.Body>
                    <h3>{this.state.self.display}</h3>
                    @{this.state.self.username}
                </Card.Body>
                </Card>
             : 
              <Loading />
            }
          </div>
        );
    }
}
