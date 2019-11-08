import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

//css
import "../home.css";

//api
import postAdapter from '../api/posts/adapter'
import adapter from "../api/auth/adapter";
import Posts from './Posts';
import TokenError from '../components/error/token';
import Search from '../components/Search';
import UserCard from '../components/UserCard';
import ActionBar from '../components/ActionBar';
import Spotlight from '../components/Spotlight';

export default class Home extends React.Component{
    state = {
        posts: []
    }
    async componentDidMount() {
        await postAdapter.recommendedPosts(localStorage.x_tn).then(posts => this.setState(posts))
        // await adapter.getSelf(localStorage.x_tn).then(data => this.setState({self: data}))
    }

    render() {
        return (
          <div className="home-container">
            <div className="home-header">
              <div className="headerbar">
                <Search />
              </div>
            </div>
            <section className="home-body">
              <Posts data={this.state.posts} />
            </section>
            <section className="home-sidepanel">
              <div className="panel-container">
                <div className="panel">
                  {/* <ActionBar /> */}
                  <UserCard />
                  <Spotlight />
                </div>
              </div>
            </section>
          </div>
        );
    }
}