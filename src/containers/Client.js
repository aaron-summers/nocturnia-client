import React from 'react';
import { Nav } from 'react-bootstrap';
import {Route, Redirect, Switch} from 'react-router-dom';

//api
import adapter from '../api/auth/adapter';

//components
import Forms from './Forms';
import Home from './Home';
import Loading from "../components/Loading";

//css
import '../client.css'
import Navigation from '../components/layout/Navbar';
import TokenError from '../components/error/token';

export default class Index extends React.Component {
  state = {
    actor: null,
    isAuthenticated: false,
    error: null,
    loading: true
  }

  signup = async (user) => {
    const data = await adapter.signup(user)
    if (!data.error) {
      await adapter.validate(data.token);
    } else {
      this.setState({error: data.error})
    }
  }

  login = async (user) => {
  const response = await adapter.login(user);
    if (response.error) {
      this.setState({ error: response.error });
    }

}

  handleError = (error) => {
    return error
  }

  async componentDidMount() {
    if (localStorage.x_tn && localStorage.a_id) {
      const token = localStorage.getItem("x_tn");
      const data = await adapter.validate(token);
      if (data._id) {
        // console.log(data)
        this.setState({loading: false, actor: {a_id: data._id, x_dn: data.displayName}, isAuthenticated: true})
      } else {
        console.log(data)
        await this.setState({loading: false, error: data.error, actor: null, isAuthenticated: true})
      }
    }
  }

    render() {
        return (
          <div className="container">
          {
              !localStorage.x_tn ? <Redirect to="/welcome" />
              : this.state.isAuthenticated ? <Redirect to="/home" />
              : this.state.loading === true ? <Redirect to="/fetching" />
              // : this.state.error ? <Redirect to="/home" />
              : <> </>
          }
          <React.Fragment>
            <Switch>
            { this.state.isAuthenticated ? <Route path="/home" component={(props) => <Home errors={this.state.error}/>}/> : <Route path="/fetching" component={Loading} /> }
            <Route path="/welcome" component={(props) => <Forms user={this.state.actor} signup={this.signup} login={this.login}/>} />
            <Route path="/fetching" component={Loading} />
            <Route path="/error" component={(props) => <TokenError details={this.state.error}/>} />
            </Switch>
          </React.Fragment>
          </div>
        );
    }
}