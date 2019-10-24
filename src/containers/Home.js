import React from 'react';

//css
import "../home.css";

//api
import postAdapter from '../api/posts/adapter'
import adapter from "../api/auth/adapter";
import Posts from './Posts';
import TokenError from '../components/error/token';
import Search from '../components/Search';
import UserCard from '../components/UserCard';

export default class Home extends React.Component{
    state = {
        posts: []
        // self: null
    }
    async componentDidMount() {
        await postAdapter.recommendedPosts(localStorage.x_tn).then(posts => this.setState(posts))
        // await adapter.getSelf(localStorage.x_tn).then(data => this.setState({self: data}))
    }

    render() {
        return (
          <div className="home-container">
            {/* { */}

            {/* // !this.state.error 
                // ? 
                // <div> */}
            <section className="home-body">
              <div className="navbar">
                {/* <h3>Home</h3> */}
                <Search />
              </div>
              <Posts data={this.state.posts} />
            </section>
            <section className="home-sidepanel">
                <div className="navpanel">
                    panel nav
                </div>
                <UserCard />
            </section>
          </div>
        );
    }
}