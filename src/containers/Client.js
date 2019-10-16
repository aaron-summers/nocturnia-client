import React from 'react';
import {} from 'react-bootstrap';
import {Route, Redirect} from 'react-router-dom';

//api
import adapter from '../api/adapter';

//components
import Forms from './Forms';

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
    render() {
        return (
          <div className="container">
          {
            !this.state.isAuthenticated ? <Redirect to="/welcome" />
            : <Redirect to="home" />
          }
          <React.Fragment>
            <Route path="/welcome" component={(props) => <Forms user={this.state.user} signup={this.signup}/>}/>
          </React.Fragment>
          </div>
        );
    }
}