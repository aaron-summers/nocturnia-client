import React from 'react';

//css
import "../home.css";

//api
import adapter from '../api/posts/adapter'
import Posts from './Posts';
import TokenError from '../components/error/token';

export default class Home extends React.Component{
    state = {
        posts: []
    }
    async componentDidMount() {
        await adapter.recommendedPosts(localStorage.x_tn).then(posts => this.setState(posts));  
    }

    render() {
        return (
            <div className="home-container">
                
                {
                    
                !this.state.posts.error 
                ? 
                <div className="home-body"> 
                    <div className="home-title" style={{border: "0.2mm solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", paddingBottom: "2px"}}><h2>Home</h2></div>
                    <Posts data={this.state.posts}/> 
                </div>
                : <div className="home-body"> 
                    <div className="home-title" style={{border: "0.2mm solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", paddingBottom: "2px"}}><h2>Home</h2></div>
                    <h3 className="error"><TokenError /></h3>
                    
                </div>
                
                } 
                
            </div>
        )
    }
}