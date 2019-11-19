import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

//api
import adapter from '../api/auth/adapter';

//components
import Forms from './Forms';
import Home from './Home';
import Loading from "../components/Loading";

//css
import '../client.css'
import TokenError from '../components/error/token';
import Root from './Root';

export default class Index extends React.Component {
  state = {
    actor: null,
    authenticated: undefined,
    error: null,
    loading: true,
  }

  signup = async (user) => {
    this.setState({error: null})
    const data = await adapter.signup(user)
    if (!data.error) {
      const login = await adapter.validate(localStorage.x_tn);
      if (!login.error) {
        // console.log(login)
        localStorage.setItem("a_id", login.user._id)
        window.location.reload()
      }
    } else if (data.error) {
      this.setState({error: data.error, loading: false})
    }
  }

  login = async (user) => {
  this.setState({ error: null });
  const response = await adapter.login(user);
    if (response.error && response.error.status === 401) {
      this.setState({ error: response.error, loading: false });
    }
}

  handleFormToggle = () => {
    this.setState({error: null})
  }

  async componentDidMount() {
    if (localStorage.x_tn) {
      const data = await adapter.validate(localStorage.x_tn)
      if (!data.valid && data.error.message !== "jwt expired") {
        await this.setState({
          authenticated: false,
          error: data.error,
          loading: false
        });
        return
      }
      if (!data.valid && data.error.message === "jwt expired") {
        await adapter.renewToken(localStorage.x_tn);
      } else {
        this.setState({
          loading: false,
          actor: { id: data.user._id, xdn: data.user.displayName },
          authenticated: true
        });
      }
    } 
  }

    render() {
        return (
          <div className="container">

          {
            !this.state.authenticated && !localStorage.x_tn
            ? <Forms {...this.props} handleFormToggle={this.handleFormToggle} error={this.state.error} user={this.state.actor} signup={this.signup} login={this.login}/>
            : this.state.error ? <TokenError />
            : this.state.loading ? <Loading />
            : <></>
          }
          {
            this.state.authenticated && <Route path="/" render={(props) => <Root error={this.state.error} {...props}/>}/>
          }
          </div>
        );
    }
}