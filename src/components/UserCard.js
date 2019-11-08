import React from 'react';

import {Card, Figure, Button} from 'react-bootstrap';
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
          <section>
            {this.state.self ? (
              <div className="user-card">
                <section className="user-card-avatar">
                  <img src={this.state.self.avatar} width={128} style={{borderRadius: "50%"}} />
                  {/* <Card.Body>
                    <h3>{this.state.self.display}</h3>
                    @{this.state.self.username}
                </Card.Body> */}
                </section>
                <section className="user-card-buttons-container">
                    {/* <section className="user-card-button-one">
                        
                    </section>
                    <section className="user-card-button-two">
                        <Button>Post</Button>
                    </section> */}
                    <button className="goto-profile">Profile</button>
                    <button className="create-post">Post</button>
                </section>
              </div>
            ) : (
              <Loading />
            )}
          </section>
        );
    }
}
