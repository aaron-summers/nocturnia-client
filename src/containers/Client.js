import React from 'react';
import {} from 'react-bootstrap';
import {Route, Redirect} from 'react-router-dom';

//api
import adapter from '../api/adapter';

//components
import Forms from './Forms';
import Home from './Home';

//css
import '../client.css'

export default class Index extends React.Component {
  state = {
    user: null,
    isAuthenticated: false
  }

  signup = async (user) => {
    console.log(user)
    const token = await adapter.signup(user)
    await adapter.validate(token)
  }

  login = async (user) => {
    // console.log(user)
    const token = await adapter.login(user)
    const data = await adapter.validate(token)
    this.setState({user: data })
    this.setState({isAuthenticated: true})
  }

  async componentDidMount() {
    // if 
    // if (localStorage.token) {
    //   adapter.validate(localStorage.token)
    // }
    // try {
      const token = localStorage.getItem("token");
      const data = await adapter.validate(token);
      console.log(data)
      // if (data.) {
      //   console.log("whaty")
      // }
      // console.log(data.message)
      // if (data.message.toLowerCase() === "jwt expired".toLowerCase()) {
      //   this.setState({isAuthenticated: false})
      // } else {
      //   this.setState({user:  data})
      //   this.setState({isAuthenticated: true})
      // }

    // } catch (error) {
      
    // }
  }

    render() {
        return (
          <div className="container">
          {
            !this.state.isAuthenticated ? <Redirect to="/welcome" />
            : <Redirect to="home" />
          }
          <React.Fragment>
            <Route path="/welcome" component={(props) => <Forms user={this.state.user} signup={this.signup} login={this.login}/>}/>
            <Route path="/home" component={Home} />
          </React.Fragment>
          </div>
        );
    }
}