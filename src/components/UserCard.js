import React from 'react';

import {Card, Figure, Button} from 'react-bootstrap';
import adapter from '../api/auth/adapter';
import Loading from './Loading'
import Search from './Search';
import Logout from './Logout';
import {Link, Redirect, Switch, Route, withRouter} from 'react-router-dom'
import Explore from './Explore';

class UserCard extends React.PureComponent{
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

    handleExploreBtn = () => {
      this.props.history.push("/explore")
    }

    handleProfile = (username) => {
      this.props.history.push(`/${username}`)
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
                    <Logout {...this.props}/>
                  </div>
                </section>
                <section className="user-section-2">
                  <section className="user-card-avatar">
                    {
                      this.state.self.avatar !== null 
                      ? <div className="usercard-avatar-image" onClick={() => this.handleProfile(this.state.self.username)}><img src={this.state.self.avatar} width={124} style={{ borderRadius: "50%" }}/></div>
                      : <div className="backup-usercard-avatar"> </div>
                    }

                  </section>
                  <section className="user-card-buttons-container">
                    <button className="goto-profile" onClick={this.handleExploreBtn}>Explore</button>
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

export default withRouter(UserCard)