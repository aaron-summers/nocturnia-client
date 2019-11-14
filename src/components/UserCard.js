import React from 'react';

import {Card, Figure, Button} from 'react-bootstrap';
import adapter from '../api/auth/adapter';
import Loading from './Loading'
import Search from './Search';
import Logout from './Logout';

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

    handleClick = () => {
        this.props.toggler()
    }

    render() {
        return (
          <section>
            {this.state.self ? (
              <div className="user-card">
                <section className="user-section-1">
                  <section>
                    <div className="dashboard-label">Dashboard</div>
                  </section>
                  <div className="logout-btn-section">
                    <Logout />
                  </div>
                </section>
                <section className="user-section-2">
                  <section className="user-card-avatar">
                    <img
                      src={this.state.self.avatar}
                      width={128}
                      style={{ borderRadius: "50%" }}
                    />
                  </section>
                  <section className="user-card-buttons-container">
                    <button className="goto-profile">Explore</button>
                    <button className="create-post" onClick={this.handleClick}>
                      Post
                    </button>
                  </section>
                </section>
              </div>
            ) : (
              <Loading />
            )}
          </section>
        );
    }
}
