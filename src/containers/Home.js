import React from 'react';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";

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
import Logout from '../components/Logout';

class Home extends React.Component{
    state = {
        posts: [],
        postsVisible: true,
        postBox: false
    }
    async componentDidMount() {
      if (sessionStorage.tmpContent) {
        const recomposed = {
          content: sessionStorage.tmpContent,
          tags: sessionStorage.tmpTags.split(",")
        };
        await postAdapter.createPost(recomposed).then(async data => {
          if (!data.error) {
            await this.setState({ posts: [data].concat(this.state.posts) });
            sessionStorage.clear()
          }
        });
      }
      await postAdapter.recommendedPosts(localStorage.x_tn).then(data => {
        if (!data.error) {
          this.setState({posts: data.posts})
        } else {
          window.location.reload()
        }
      })
    }

    toggleModal = () => {
      this.setState({postBox: !this.state.postBox})
    }

    submitPost = async (post) => {
      await postAdapter.createPost(post).then(async data => {
        console.log(data)
        if (!data.error) {
            await this.setState(prevState => ({
              posts: [data].concat(...prevState.posts)
            }));
        }
      })

      await this.setState({postBox: false})
    }

    render() {
        return (
          <div className="home-container">
            <section className="home-app-left-panel-container">
              <div className="fixed-left-panel">
                <div className="left-panel">

                </div>
              </div>
            </section>
            {/* <div className="home-header">
              <div className="headerbar">
                <Search />
              </div>
            </div> */}
            <section className="home-body">
              <div className="posts-container">
                <Posts data={this.state.posts} />
              </div>
            </section>
            {/* <section className="sidepanel-header-container">
              <div className="sidepanel-empty-child-container">
              </div>
            </section> */}
            <section className="home-sidepanel">
              <div className="panel-container">
                <div className="panel">
                    <UserCard toggler={this.toggleModal} {...this.props}/>
                  {this.state.postBox ? (
                    <QuickPostBox submit={this.submitPost} toggler={this.toggleModal} />
                  ) : (
                    <> </>
                  )}
                  <Spotlight />
                </div>
              </div>
            </section>
          </div>
        );
    }
}

export default withRouter(Home)