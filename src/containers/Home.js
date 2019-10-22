import React from 'react';

//css
import "../home.css";

//api
import adapter from '../api/posts/adapter'
import Posts from './Posts';
import TokenError from '../components/error/token';
import Search from '../components/Search';

export default class Home extends React.Component{
    state = {
        posts: []
    }
    async componentDidMount() {
        await adapter.recommendedPosts(localStorage.x_tn).then(posts => this.setState(posts))
        // console.table(this.state.error)
    }

    render() {
        return (
            <div className="home-container">
                
                {
                    
                !this.state.error 
                ? 
                <div className="home-body"> 
                    <div className="navbar" style={{border: "0.2mm solid rgba(255, 255, 255, 0.2)"}}>
                        {/* <h3 style={{height: "100%"}}>Home</h3> */}
                        <Search />
                        {/* <input style={{border: "none", borderRadius: "20px"}}></input> */}
                    </div>
                    <Posts data={this.state.posts}/> 
                </div>
                : <div className="home-body"> 
                    <div className="navbar" style={{border: "0.2mm solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", paddingBottom: "2px"}}><h2>Home</h2></div>
                    <div className="error"><h4 className="error-message">{this.state.error.message.toUpperCase()}</h4></div>
                    
                </div>
                
                } 
                
            </div>
        )
    }
}