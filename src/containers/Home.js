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
import QuickPostBox from '../components/QuickPost';

export default class Home extends React.Component{
    state = {
        posts: [],
        postsVisible: true,
        postBox: false
    }
    async componentDidMount() {
        await postAdapter.recommendedPosts(localStorage.x_tn).then(posts => this.setState(posts))
    }

    toggleModal = () => {
      this.setState({postBox: !this.state.postBox})
    }

    submitPost = async (post) => {
      // await console.log(post)
      await postAdapter.createPost(post)
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
              <div className="posts-container">
                <Posts data={this.state.posts} />
              </div>
            </section>
            <section className="home-sidepanel">
              <div className="panel-container">
                <div className="panel">
                  <UserCard toggler={this.toggleModal} />
                  {this.state.postBox 
                  ? <QuickPostBox submit={this.submitPost}/>
                  : <> </>
                  }
                  <Spotlight />
                </div>
              </div>
            </section>
          </div>
        );
    }
}

// style={{ display: "hidden" }}